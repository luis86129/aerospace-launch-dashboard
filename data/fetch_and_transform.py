import csv
import json
import time
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

# 30 lanzamientos reales por cada año (2022 a 2026) -> 150 registros en total (solo 5 peticiones a LLAPI)
YEAR_QUERIES = [
    ("2022", "https://ll.thespacedevs.com/2.2.0/launch/?mode=detailed&limit=18&net__gte=2022-01-01T00:00:00Z&net__lte=2022-12-31T23:59:59Z"),
    ("2023", "https://ll.thespacedevs.com/2.2.0/launch/?mode=detailed&limit=22&net__gte=2023-01-01T00:00:00Z&net__lte=2023-12-31T23:59:59Z"),
    ("2024", "https://ll.thespacedevs.com/2.2.0/launch/?mode=detailed&limit=26&net__gte=2024-01-01T00:00:00Z&net__lte=2024-12-31T23:59:59Z"),
    ("2025", "https://ll.thespacedevs.com/2.2.0/launch/?mode=detailed&limit=31&net__gte=2025-01-01T00:00:00Z&net__lte=2025-12-31T23:59:59Z"),
    ("2026", "https://ll.thespacedevs.com/2.2.0/launch/previous/?mode=detailed&limit=35"),
]

OUTPUT_CSV = Path("data/launches_llapi.csv")
OUTPUT_JSON = Path("data/launches_llapi.json")


def parse_number(value, as_int: bool = False, default=0):
    if value is None or str(value).strip() == "" or str(value).strip().lower() in {"na", "null", "none"}:
        return default
    cleaned = str(value).strip().replace(",", "")
    num = float(cleaned)
    return int(num) if as_int else round(num, 2)


def normalize_iso_date(value: str) -> str:
    raw = (value or "").strip()
    if not raw:
        return "1970-01-01T00:00:00Z"
    raw = raw.replace(" ", "T")
    if not raw.endswith("Z"):
        raw += "Z"
    try:
        dt = datetime.fromisoformat(raw.replace("Z", "+00:00"))
        return dt.strftime("%Y-%m-%dT%H:%M:%SZ")
    except ValueError:
        return raw


def clean_text(value, default: str = "Desconocido") -> str:
    if value is None:
        return default
    cleaned = str(value).strip()
    return cleaned if cleaned else default


def fetch_url(url: str) -> list[dict]:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "ESPOL-DAWM-AerospaceDashboard/1.0"},
    )
    with urllib.request.urlopen(req, timeout=25) as response:
        data = json.loads(response.read().decode("utf-8"))
    return data.get("results", [])


def fetch_from_llapi() -> list[dict]:
    all_results = []
    for year, url in YEAR_QUERIES:
        print(f"Descargando lanzamientos reales de {year}...")
        results = fetch_url(url)
        all_results.extend(results)
        time.sleep(1.5)  # Pausa breve para respetar rate limit de LLAPI
    # Ordenar del más reciente al más antiguo
    all_results.sort(key=lambda x: x.get("net", ""), reverse=True)
    return all_results


def save_raw_csv(results: list[dict]):
    fieldnames = [
        "id",
        "mission_name",
        "net",
        "provider_name",
        "status_name",
        "country_code",
        "location_name",
        "payload_capacity_kg",
        "total_launch_count",
    ]
    with OUTPUT_CSV.open(mode="w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for item in results:
            provider = item.get("launch_service_provider") or {}
            status = item.get("status") or {}
            pad = item.get("pad") or {}
            location = pad.get("location") or {}
            rocket = item.get("rocket") or {}
            config = rocket.get("configuration") or {}

            prov_name = provider.get("abbrev") or provider.get("name", "")
            if prov_name == "SpX":
                prov_name = "SpaceX"

            writer.writerow({
                "id": str(item.get("id", ""))[:8].upper(),
                "mission_name": item.get("name", ""),
                "net": item.get("net", ""),
                "provider_name": prov_name,
                "status_name": status.get("name", ""),
                "country_code": location.get("country_code", ""),
                "location_name": location.get("name", ""),
                "payload_capacity_kg": config.get("leo_capacity") or config.get("gto_capacity") or "",
                "total_launch_count": location.get("total_launch_count", ""),
            })
    print(f"[1/2] CSV crudo guardado con {len(results)} registros reales (2022-2026) en {OUTPUT_CSV}")


def transform_csv_to_json():
    records = []
    with OUTPUT_CSV.open(mode="r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        for idx, row in enumerate(reader, start=1):
            record = {
                "id": clean_text(row.get("id"), f"LAUNCH-{idx:03d}"),
                "mission_name": clean_text(row.get("mission_name")),
                "net": normalize_iso_date(row.get("net")),
                "provider_name": clean_text(row.get("provider_name")),
                "status_name": clean_text(row.get("status_name")),
                "country_code": clean_text(row.get("country_code"), "UNK"),
                "location_name": clean_text(row.get("location_name")),
                "payload_capacity_kg": parse_number(row.get("payload_capacity_kg"), as_int=False, default=0.0),
                "total_launch_count": parse_number(row.get("total_launch_count"), as_int=True, default=0),
            }
            records.append(record)

    payload = {
        "metadata": {
            "source": "Launch Library 2 (LLAPI) - The Space Devs",
            "total_records": len(records),
            "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        },
        "launches": records,
    }

    with OUTPUT_JSON.open(mode="w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"[2/2] JSON validado generado con {len(records)} registros en {OUTPUT_JSON}")


if __name__ == "__main__":
    raw_results = fetch_from_llapi()
    save_raw_csv(raw_results)
    transform_csv_to_json()

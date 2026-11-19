import csv
import json
from datetime import datetime, timezone
from pathlib import Path

INPUT_CSV = Path("data/launches_llapi.csv")
OUTPUT_JSON = Path("data/launches_llapi.json")


def parse_number(value: str, as_int: bool = False, default=0):
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


def clean_text(value: str, default: str = "Desconocido") -> str:
    if value is None:
        return default
    cleaned = str(value).strip()
    return cleaned if cleaned else default


def transform_csv_to_json():
    records = []
    with INPUT_CSV.open(mode="r", encoding="utf-8-sig", newline="") as f:
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

    print(f"Transformación completada: {len(records)} registros validados en {OUTPUT_JSON}")


if __name__ == "__main__":
    transform_csv_to_json()

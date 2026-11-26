import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Rocket, ShieldCheck, Weight } from "lucide-react";
import useFetchLaunches from "../hooks/useFetchLaunches";
import { AgencyShareChart } from "./components/AgencyShareChart";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LaunchesTable } from "./components/LaunchesTable";
import { LaunchTrendChart } from "./components/LaunchTrendChart";
import { MetricCard } from "./components/MetricCard";
import { MissionOutcomeChart } from "./components/MissionOutcomeChart";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#07101f",
      paper: "#111b2e",
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
  },
});

export default function App() {
  const { launches, metadata, loading, error } = useFetchLaunches();
  const [provider, setProvider] = useState("Todos los Proveedores");
  const [status, setStatus] = useState("Todos los Estados");

  // Opciones dinámicas extraídas de Firebase
  const providers = useMemo(() => {
    const unique = Array.from(new Set(launches.map((l) => l.provider_name))).sort();
    return ["Todos los Proveedores", ...unique];
  }, [launches]);

  const statuses = useMemo(() => {
    const unique = Array.from(new Set(launches.map((l) => l.status_name))).sort();
    return ["Todos los Estados", ...unique];
  }, [launches]);

  // Filtrado en memoria
  const filteredLaunches = useMemo(
    () =>
      launches.filter(
        (launch) =>
          (provider === "Todos los Proveedores" || launch.provider_name === provider) &&
          (status === "Todos los Estados" || launch.status_name === status),
      ),
    [launches, provider, status],
  );

  // KPIs calculados dinámicamente desde Firebase
  const summary = useMemo(() => {
    const total = launches.length;
    const successful = launches.filter((l) => l.status_name === "Success").length;
    const completed = launches.filter(
      (l) => l.status_name === "Success" || l.status_name === "Failure",
    ).length;
    const successRate = completed > 0 ? ((successful / completed) * 100).toFixed(1) : "0.0";
    const totalPayloadTons = Math.round(
      launches.reduce((acc, l) => acc + (Number(l.payload_capacity_kg) || 0), 0) / 1000,
    );
    const averagePayloadTons = total > 0 ? (totalPayloadTons / total).toFixed(1) : "0.0";

    return { total, successful, successRate, totalPayloadTons, averagePayloadTons };
  }, [launches]);

  // Datos para Gráfico 1: Lanzamientos por año
  const yearlyLaunches = useMemo(() => {
    const counts: Record<string, number> = {};
    launches.forEach((l) => {
      const year = l.net?.slice(0, 4);
      if (year) counts[year] = (counts[year] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([year, count]) => ({ year, launches: count }));
  }, [launches]);

  // Datos para Gráfico 2: Cuota por agencia
  const agencyShare = useMemo(() => {
    if (launches.length === 0) return [];
    const counts: Record<string, number> = {};
    launches.forEach((l) => {
      counts[l.provider_name] = (counts[l.provider_name] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
    const topTwo = sorted.slice(0, 2);
    const othersCount = sorted.slice(2).reduce((acc, [, v]) => acc + v, 0);
    const palette = ["#c7ff4a", "#38bdf8", "#8b5cf6"];

    const slices = topTwo.map(([name, count], idx) => ({
      name,
      value: Math.round((count / launches.length) * 100),
      color: palette[idx],
    }));

    if (othersCount > 0) {
      slices.push({
        name: "Otros",
        value: Math.max(0, 100 - slices.reduce((s, item) => s + item.value, 0)),
        color: palette[2],
      });
    }
    return slices;
  }, [launches]);

  // Datos para Gráfico 3: Éxito vs. fallo
  const missionOutcome = useMemo(() => {
    const successful = launches.filter((l) => l.status_name === "Success").length;
    const failed = launches.filter((l) => l.status_name === "Failure").length;
    return [
      { name: "Exitosos", value: successful, color: "#c7ff4a" },
      { name: "Fallidos", value: failed, color: "#fb7185" },
    ];
  }, [launches]);

  const hasActiveFilters =
    provider !== "Todos los Proveedores" || status !== "Todos los Estados";

  const handleResetFilters = () => {
    setProvider("Todos los Proveedores");
    setStatus("Todos los Estados");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "#07101f", color: "#f8fafc" }}>
        <Header />

        <Container maxWidth="xl" sx={{ pt: 3.5, pb: 6, px: { xs: 2.5, sm: 4, lg: 6 } }}>
          <HeroSection
            provider={provider}
            status={status}
            providers={providers}
            statuses={statuses}
            onProviderChange={setProvider}
            onStatusChange={setStatus}
          />

          {loading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 10,
                gap: 2,
              }}
            >
              <CircularProgress sx={{ color: "#c7ff4a" }} />
              <Typography sx={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#94a3b8" }}>
                Consultando Firebase Realtime Database...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
              Error al recuperar los datos de Firebase: {error}
            </Alert>
          )}

          {!loading && !error && (
            <>
              <Grid container spacing={2} sx={{ mb: 3.5 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <MetricCard
                    eyebrow="Total lanzamientos"
                    value={summary.total.toLocaleString("en-US")}
                    detail="Registros en Realtime Database"
                    icon={Rocket}
                    accent="lime"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <MetricCard
                    eyebrow="Tasa de éxito"
                    value={`${summary.successRate}%`}
                    detail={`${summary.successful.toLocaleString("en-US")} misiones exitosas`}
                    icon={ShieldCheck}
                    accent="blue"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <MetricCard
                    eyebrow="Carga transportada"
                    value={`${summary.totalPayloadTons.toLocaleString("en-US")} t`}
                    detail={`Promedio: ${summary.averagePayloadTons}t por cohete`}
                    icon={Weight}
                    accent="violet"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mb: 3.5 }}>
                <Grid size={{ xs: 12, lg: 6 }}>
                  <LaunchTrendChart data={yearlyLaunches} />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                  <AgencyShareChart data={agencyShare} />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                  <MissionOutcomeChart data={missionOutcome} />
                </Grid>
              </Grid>

              <LaunchesTable
                launches={filteredLaunches}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
              />
            </>
          )}

          <Footer lastUpdated={metadata?.generated_at} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
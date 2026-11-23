import { useMemo, useState } from "react";
import { Box, Container, createTheme, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { Rocket, ShieldCheck, Weight } from "lucide-react";
import { AgencyShareChart } from "./components/AgencyShareChart";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LaunchesTable } from "./components/LaunchesTable";
import { LaunchTrendChart } from "./components/LaunchTrendChart";
import { MetricCard } from "./components/MetricCard";
import { MissionOutcomeChart } from "./components/MissionOutcomeChart";
import {
  agencyShare,
  launches,
  launchSummary,
  missionOutcome,
  yearlyLaunches,
} from "./data/launchData";

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
  const [provider, setProvider] = useState("Todos los Proveedores");
  const [status, setStatus] = useState("Todos los Estados");

  const providers = ["Todos los Proveedores", "SpaceX", "NASA", "ESA", "ISRO", "CASC"];
  const statuses = ["Todos los Estados", "Success", "Failure", "Go for Launch"];

  const filteredLaunches = useMemo(
    () =>
      launches.filter(
        (launch) =>
          (provider === "Todos los Proveedores" || launch.provider === provider) &&
          (status === "Todos los Estados" || launch.status === status),
      ),
    [provider, status],
  );

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

          {/* Rejilla de 3 KPIs responsiva */}
          <Grid container spacing={2} sx={{ mb: 3.5 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <MetricCard
                eyebrow="Total lanzamientos"
                value={launchSummary.total.toLocaleString("en-US")}
                detail="+12% este mes"
                icon={Rocket}
                accent="lime"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <MetricCard
                eyebrow="Tasa de éxito"
                value={`${launchSummary.successRate}%`}
                detail={`${launchSummary.successful.toLocaleString("en-US")} misiones exitosas`}
                icon={ShieldCheck}
                accent="blue"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <MetricCard
                eyebrow="Carga transportada"
                value={`${launchSummary.payload.toLocaleString("en-US")} t`}
                detail={`Promedio: ${launchSummary.averagePayload}t por cohete`}
                icon={Weight}
                accent="violet"
              />
            </Grid>
          </Grid>

          {/* Rejilla de 3 gráficos responsiva */}
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

          {/* Tabla detallada */}
          <LaunchesTable
            launches={filteredLaunches}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
          />

          <Footer />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
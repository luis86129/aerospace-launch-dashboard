import { Box, Grid, Typography } from "@mui/material";
import { Orbit } from "lucide-react";
import { FilterSelect } from "./FilterSelect";

export interface HeroSectionProps {
  provider: string;
  status: string;
  providers: string[];
  statuses: string[];
  onProviderChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function HeroSection({
  provider,
  status,
  providers,
  statuses,
  onProviderChange,
  onStatusChange,
}: HeroSectionProps) {
  return (
    <Box
      component="section"
      sx={{
        mb: 3.5,
        pb: 3.5,
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", lg: "flex-end" },
        gap: 3,
      }}
    >
      <Box sx={{ maxWidth: 640 }}>
        <Box
          sx={{
            mb: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontFamily: "monospace",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "#c7ff4a",
          }}
        >
          <Orbit size={13} />
          Centro de control orbital
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            fontSize: { xs: "1.85rem", sm: "2.35rem" },
          }}
        >
          Inteligencia de misión,
          <Box component="span" sx={{ display: "block", color: "#64748b" }}>
            en una sola trayectoria.
          </Box>
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ width: { xs: "100%", lg: 520 } }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FilterSelect
            label="01 — Proveedor"
            value={provider}
            options={providers}
            onChange={onProviderChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FilterSelect
            label="02 — Estado de misión"
            value={status}
            options={statuses}
            onChange={onStatusChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
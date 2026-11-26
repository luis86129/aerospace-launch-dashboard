import { Box, Typography } from "@mui/material";
import { Orbit } from "lucide-react";

export function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        mb: 3.5,
        pb: 3.5,
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "flex-end" },
        gap: 2,
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

      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "#64748b",
        }}
      >
        Telemetría histórica · 2022 — 2026
      </Typography>
    </Box>
  );
}
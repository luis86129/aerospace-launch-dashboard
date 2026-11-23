import { Box, Typography } from "@mui/material";
import { Clock3, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 3.5,
        pt: 2.5,
        borderTop: "1px solid rgba(255, 255, 255, 0.07)",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: 1.5,
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontFamily: "monospace",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: "#475569",
        }}
      >
        <Sparkles size={12} />
        Datos sincronizados con LLAPI
      </Typography>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: "0.65rem",
          color: "#475569",
        }}
      >
        <Clock3 size={12} />
        Última actualización: 28 oct 2026, 14:32 UTC
      </Typography>
    </Box>
  );
}
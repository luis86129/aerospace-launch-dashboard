import { Box, Typography } from "@mui/material";

export interface SectionHeaderProps {
  index: string;
  title: string;
  detail: string;
}

export function SectionHeader({ index, title, detail }: SectionHeaderProps) {
  return (
    <Box sx={{ mb: 2.5, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 2 }}>
      <Box>
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "#64748b",
          }}
        >
          {index} / Telemetría
        </Typography>
        <Typography sx={{ mt: 0.75, fontSize: "1rem", fontWeight: 600, color: "#f1f5f9" }}>
          {title}
        </Typography>
      </Box>
      <Typography
        sx={{
          display: { xs: "none", sm: "block" },
          fontFamily: "monospace",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: "#475569",
        }}
      >
        {detail}
      </Typography>
    </Box>
  );
}
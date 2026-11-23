import { Box, Paper, Typography } from "@mui/material";
import { ArrowUpRight, Rocket } from "lucide-react";

export interface MetricCardProps {
  eyebrow: string;
  value: string;
  detail: string;
  icon: typeof Rocket;
  accent: "lime" | "blue" | "violet";
}

export function MetricCard({
  eyebrow,
  value,
  detail,
  icon: Icon,
  accent,
}: MetricCardProps) {
  const accents = {
    lime: {
      iconBg: "rgba(199, 255, 74, 0.1)",
      iconColor: "#c7ff4a",
      iconBorder: "rgba(199, 255, 74, 0.2)",
      line: "#c7ff4a",
    },
    blue: {
      iconBg: "rgba(56, 189, 248, 0.1)",
      iconColor: "#7dd3fc",
      iconBorder: "rgba(56, 189, 248, 0.2)",
      line: "#38bdf8",
    },
    violet: {
      iconBg: "rgba(167, 139, 250, 0.1)",
      iconColor: "#c4b5fd",
      iconBorder: "rgba(167, 139, 250, 0.2)",
      line: "#a78bfa",
    },
  }[accent];

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        bgcolor: "rgba(17, 27, 46, 0.85)",
        p: 2.5,
        backdropFilter: "blur(8px)",
        transition: "border-color 0.2s",
        "&:hover": { borderColor: "rgba(255, 255, 255, 0.16)" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: "2px",
          bgcolor: accents.line,
        }}
      />
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
        <Box>
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#64748b",
            }}
          >
            {eyebrow}
          </Typography>
          <Typography
            sx={{
              mt: 1.5,
              fontSize: { xs: "1.85rem", sm: "2.25rem" },
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 2.5,
            border: `1px solid ${accents.iconBorder}`,
            bgcolor: accents.iconBg,
            color: accents.iconColor,
          }}
        >
          <Icon size={18} strokeWidth={1.8} />
        </Box>
      </Box>
      <Typography
        sx={{
          mt: 1.75,
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          fontSize: "0.75rem",
          color: "#94a3b8",
        }}
      >
        {accent === "lime" && <ArrowUpRight size={13} color="#c7ff4a" />}
        {detail}
      </Typography>
    </Paper>
  );
}
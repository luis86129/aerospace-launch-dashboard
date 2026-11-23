import { Box, Paper, Typography } from "@mui/material";
import { Satellite } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { SectionHeader } from "./SectionHeader";

export interface AgencyShareChartProps {
  data: Array<{ name: string; value: number; color: string }>;
}

const tooltipStyle = {
  backgroundColor: "#101a2c",
  border: "1px solid #26344d",
  borderRadius: "10px",
  color: "#f7f9fc",
};

export function AgencyShareChart({ data }: AgencyShareChartProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        bgcolor: "rgba(13, 23, 41, 0.8)",
        p: { xs: 2.5, sm: 3 },
      }}
    >
      <SectionHeader index="02" title="Cuota por agencia" detail="Global" />
      <Box sx={{ position: "relative", height: 185 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => [`${value}%`, "Cuota"]}
            />
          </PieChart>
        </ResponsiveContainer>
        <Box
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Satellite size={18} color="#64748b" />
          <Typography
            sx={{
              mt: 0.5,
              fontFamily: "monospace",
              fontSize: "0.55rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#64748b",
            }}
          >
            Share
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
        {data.map((agency) => (
          <Box
            key={agency.name}
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#94a3b8" }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: agency.color }} />
              {agency.name}
            </Box>
            <Typography sx={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#e2e8f0" }}>
              {agency.value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
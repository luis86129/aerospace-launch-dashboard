import { Box, Paper } from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHeader } from "./SectionHeader";

export interface LaunchTrendChartProps {
  data: Array<{ year: string; launches: number }>;
}

const tooltipStyle = {
  backgroundColor: "#101a2c",
  border: "1px solid #26344d",
  borderRadius: "10px",
  color: "#f7f9fc",
};

export function LaunchTrendChart({ data }: LaunchTrendChartProps) {
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
      <SectionHeader index="01" title="Lanzamientos por año" detail="2022 — 2026" />
      <Box sx={{ height: 270 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 6, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="launchArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c7ff4a" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#c7ff4a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#26344d" strokeOpacity={0.6} vertical={false} />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6f7d95", fontSize: 10, fontFamily: "monospace" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6f7d95", fontSize: 10, fontFamily: "monospace" }}
            />
            <Tooltip
              cursor={{ stroke: "#c7ff4a", strokeOpacity: 0.2 }}
              contentStyle={tooltipStyle}
              itemStyle={{ color: "#c7ff4a" }}
              labelStyle={{ color: "#94a3b8", marginBottom: 4 }}
              formatter={(value: number) => [`${value} misiones`, "Lanzamientos"]}
            />
            <Area
              type="monotone"
              dataKey="launches"
              stroke="#c7ff4a"
              strokeWidth={2.5}
              fill="url(#launchArea)"
              dot={{ fill: "#0d1729", stroke: "#c7ff4a", strokeWidth: 2, r: 4 }}
              activeDot={{ fill: "#c7ff4a", stroke: "#0d1729", strokeWidth: 3, r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
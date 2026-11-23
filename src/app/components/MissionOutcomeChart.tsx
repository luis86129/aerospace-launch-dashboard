import { Box, Grid, Paper, Typography } from "@mui/material";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionHeader } from "./SectionHeader";

export interface MissionOutcomeChartProps {
  data: Array<{ name: string; value: number; color: string }>;
}

const tooltipStyle = {
  backgroundColor: "#101a2c",
  border: "1px solid #26344d",
  borderRadius: "10px",
  color: "#f7f9fc",
};

export function MissionOutcomeChart({ data }: MissionOutcomeChartProps) {
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
      <SectionHeader index="03" title="Éxito vs. fallo" detail="Acumulado" />
      <Box sx={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 15, right: 4, left: 4, bottom: 0 }}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6f7d95", fontSize: 10, fontFamily: "monospace" }}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,.025)" }}
              contentStyle={tooltipStyle}
              formatter={(value: number) => [value.toLocaleString("en-US"), "Misiones"]}
            />
            <Bar dataKey="value" radius={[7, 7, 2, 2]} barSize={48}>
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Grid container spacing={1} sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.07)", pt: 2 }}>
        {data.map((item) => (
          <Grid size={{ xs: 6 }} key={item.name}>
            <Typography sx={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff" }}>
              {item.value.toLocaleString("en-US")}
            </Typography>
            <Typography sx={{ fontSize: "0.65rem", color: "#64748b" }}>{item.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
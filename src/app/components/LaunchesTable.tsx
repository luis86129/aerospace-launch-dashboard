import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Activity, Box as BoxIcon, CalendarDays, CircleDot, MapPin, Rocket } from "lucide-react";
import { Launch } from "../data/launchData";
import { StatusBadge } from "./StatusBadge";

export interface LaunchesTableProps {
  launches: Launch[];
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export function LaunchesTable({
  launches,
  hasActiveFilters,
  onResetFilters,
}: LaunchesTableProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        bgcolor: "rgba(13, 23, 41, 0.8)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 1.5,
          borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
          px: { xs: 2.5, sm: 3 },
          py: 2.5,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Activity size={16} color="#c7ff4a" />
            <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#ffffff" }}>
              Lanzamientos detallados
            </Typography>
          </Box>
          <Typography
            sx={{
              mt: 0.75,
              fontFamily: "monospace",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "#64748b",
            }}
          >
            Registro de misiones / NET
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {hasActiveFilters && (
            <Button
              size="small"
              variant="outlined"
              onClick={onResetFilters}
              sx={{
                borderColor: "rgba(255, 255, 255, 0.14)",
                color: "#94a3b8",
                textTransform: "none",
                fontSize: "0.7rem",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                },
              }}
            >
              Limpiar filtros
            </Button>
          )}
          <Box
            sx={{
              borderRadius: 2,
              bgcolor: "rgba(255, 255, 255, 0.04)",
              px: 1.5,
              py: 1,
              fontFamily: "monospace",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#64748b",
            }}
          >
            {launches.length} resultados
          </Box>
        </Box>
      </Box>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 820 }}>
          <TableHead>
            <TableRow sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
              {["Misión", "Proveedor", "Fecha (NET)", "Ubicación", "Estado"].map((heading) => (
                <TableCell
                  key={heading}
                  sx={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                    py: 1.75,
                    px: 3,
                    fontFamily: "monospace",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "#64748b",
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {launches.map((launch) => (
              <TableRow
                key={launch.mission}
                sx={{
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.025)" },
                  "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
                  "&:last-child td": { borderBottom: 0 },
                }}
              >
                <TableCell sx={{ px: 3, py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 32,
                        height: 32,
                        borderRadius: 2,
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        bgcolor: "rgba(255, 255, 255, 0.03)",
                        color: "#64748b",
                      }}
                    >
                      <Rocket size={14} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "0.78rem", fontWeight: 500, color: "#e2e8f0" }}>
                        {launch.mission}
                      </Typography>
                      <Typography sx={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#475569" }}>
                        {launch.code}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ px: 3, py: 2 }}>
                  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, fontSize: "0.78rem", color: "#94a3b8" }}>
                    <CircleDot size={12} color="#475569" />
                    {launch.provider}
                  </Box>
                </TableCell>
                <TableCell sx={{ px: 3, py: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontFamily: "monospace",
                      fontSize: "0.68rem",
                      color: "#94a3b8",
                    }}
                  >
                    <CalendarDays size={12} color="#475569" />
                    {launch.date}
                  </Box>
                </TableCell>
                <TableCell sx={{ px: 3, py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "0.78rem", color: "#94a3b8" }}>
                    <MapPin size={12} color="#475569" />
                    {launch.location}
                  </Box>
                </TableCell>
                <TableCell sx={{ px: 3, py: 2 }}>
                  <StatusBadge status={launch.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {launches.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: 3,
              py: 8,
              textAlign: "center",
            }}
          >
            <BoxIcon size={24} color="#475569" />
            <Typography sx={{ mt: 1.5, fontSize: "0.88rem", color: "#cbd5e1" }}>
              No hay misiones con estos filtros
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: "0.75rem", color: "#475569" }}>
              Prueba otra combinación de proveedor y estado.
            </Typography>
          </Box>
        )}
      </TableContainer>
    </Paper>
  );
}
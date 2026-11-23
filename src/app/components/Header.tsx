import { Box, Container, Divider, Typography } from "@mui/material";
import { Rocket } from "lucide-react";

export function Header() {
  return (
    <Box component="header" sx={{ position: "relative", borderBottom: "1px solid rgba(255, 255, 255, 0.07)" }}>
      <Container maxWidth="xl" sx={{ py: 2.5, px: { xs: 2.5, sm: 4, lg: 6 } }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 3,
                border: "1px solid rgba(199, 255, 74, 0.25)",
                bgcolor: "rgba(199, 255, 74, 0.1)",
                color: "#c7ff4a",
              }}
            >
              <Rocket size={20} />
              <Box
                sx={{
                  position: "absolute",
                  right: -3,
                  top: -3,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#c7ff4a",
                  boxShadow: "0 0 12px #c7ff4a",
                }}
              />
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.03em", color: "#fff" }}>
                  Space Launch Analytics
                </Typography>
                <Box
                  component="span"
                  sx={{
                    display: { xs: "none", sm: "inline" },
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 1,
                    px: 0.75,
                    py: 0.25,
                    fontFamily: "monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.12em",
                    color: "#64748b",
                  }}
                >
                  LLAPI
                </Box>
              </Box>
              <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>
                Monitoreo global de lanzamientos aeroespaciales
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontFamily: "monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                color: "#64748b",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#34d399",
                  boxShadow: "0 0 8px #34d399",
                }}
              />
              DAWM
            </Box>
            <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
            <Typography sx={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#94a3b8" }}>
              UTC 14:32:08
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
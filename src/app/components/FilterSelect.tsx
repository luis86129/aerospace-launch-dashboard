import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";

export interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          mb: 1,
          fontFamily: "monospace",
          fontSize: "0.62rem",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: "#64748b",
        }}
      >
        {label}
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            height: 44,
            borderRadius: 3,
            bgcolor: "#111b2e",
            color: "#e2e8f0",
            fontSize: "0.8rem",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.1)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.22)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(199, 255, 74, 0.6)",
            },
            "& .MuiSvgIcon-root": {
              color: "#64748b",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#101a2c",
                color: "#e2e8f0",
                border: "1px solid #26344d",
              },
            },
          }}
        >
          {options.map((item) => (
            <MenuItem key={item} value={item} sx={{ fontSize: "0.8rem" }}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
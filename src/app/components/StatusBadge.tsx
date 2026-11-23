import { Chip } from "@mui/material";

export interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isSuccess = status === "Success";
  const isUpcoming = status === "Go for Launch";

  const styles = isSuccess
    ? {
        borderColor: "rgba(52, 211, 153, 0.25)",
        bgcolor: "rgba(52, 211, 153, 0.1)",
        color: "#6ee7b7",
        dot: "#6ee7b7",
      }
    : isUpcoming
      ? {
          borderColor: "rgba(56, 189, 248, 0.25)",
          bgcolor: "rgba(56, 189, 248, 0.1)",
          color: "#7dd3fc",
          dot: "#7dd3fc",
        }
      : {
          borderColor: "rgba(251, 113, 133, 0.25)",
          bgcolor: "rgba(251, 113, 133, 0.1)",
          color: "#fda4af",
          dot: "#fda4af",
        };

  return (
    <Chip
      size="small"
      variant="outlined"
      icon={
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: styles.dot,
            marginLeft: 8,
          }}
        />
      }
      label={status}
      sx={{
        borderColor: styles.borderColor,
        bgcolor: styles.bgcolor,
        color: styles.color,
        fontFamily: "monospace",
        fontSize: "0.65rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    />
  );
}

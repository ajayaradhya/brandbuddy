import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Box,
  Tooltip,
  useTheme,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";

export default function ReminderCard({ label, items = [], type }) {
  const theme = useTheme();
  const isOverdue = type === "overdue";

  const icon = isOverdue ? (
    <WarningAmberIcon sx={{ color: theme.palette.error.main }} />
  ) : (
    <AccessTimeIcon sx={{ color: theme.palette.primary.main }} />
  );

  const bgColor = isOverdue ? "#fff0f1" : "#eff6ff"; // light red / light blue
  const dateKey = "delivery_deadline"
  const dateLabel = "Due"

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      style={{ height: "100%", borderRadius: 16 }}
    >
      <Card
        sx={{
          backgroundColor: bgColor,
          borderRadius: 3,
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.06)",
          px: 3,
          py: 2.5,
          height: "100%",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            {icon}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ fontSize: "1rem" }}
            >
              {label} ({items.length})
            </Typography>
          </Stack>

          {items.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              🎉 All caught up!
            </Typography>
          ) : (
            <Stack spacing={2}>
              {items.slice(0, 3).map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 1.2,
                    borderRadius: 2,
                    backgroundColor: "white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    sx={{ color: "#111827", mb: 0.5 }}
                  >
                    {item.brand} — {item.campaign || "Untitled"}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Tooltip title={`${dateLabel} Date`}>
                      <Chip
                        label={`${dateLabel}: ${item[dateKey]}`}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: "999px",
                          fontSize: "0.75rem",
                          color: isOverdue
                            ? theme.palette.error.main
                            : theme.palette.primary.main,
                          borderColor: isOverdue
                            ? theme.palette.error.main
                            : theme.palette.primary.main,
                          fontWeight: 500,
                        }}
                      />
                    </Tooltip>

                    <Tooltip title="Collab Status">
                      <Chip
                        label={item.status.replace(/_/g, " ").toUpperCase()}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: "999px",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                        }}
                      />
                    </Tooltip>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

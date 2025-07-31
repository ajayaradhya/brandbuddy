import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatCard({ label, value, icon }) {
  return (
    <Card
      sx={{
        background: "#fafafa",
        color: "#222",
        borderRadius: 3,
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
        minHeight: 110,
        transition: "transform 0.15s",
        "&:hover": { transform: "translateY(-4px) scale(1.03)" },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          {icon && <Box fontSize={32} color="#222">{icon}</Box>}
          <Typography variant="h6" fontWeight={700}>
            {value}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}

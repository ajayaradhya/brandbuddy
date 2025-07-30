import { Card, CardContent, Typography } from "@mui/material";

export default function ReminderCard({ label, count }) {
  return (
    <Card sx={{ background: "#fef3c7" }}>
      <CardContent>
        <Typography variant="body2">{label}</Typography>
        <Typography variant="h5">{count}</Typography>
      </CardContent>
    </Card>
  );
}

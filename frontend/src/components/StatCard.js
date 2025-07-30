import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ label, value }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </CardContent>
    </Card>
  );
}

import { Paper, Typography } from '@mui/material';

const StatCard = ({ label, value }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, minWidth: 180 }}>
      <Typography variant="h6">{value}</Typography>
      <Typography color="textSecondary">{label}</Typography>
    </Paper>
  );
};

export default StatCard;

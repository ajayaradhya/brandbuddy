import { Box, Grid, Typography } from '@mui/material';
import StatCard from './StatCard';

const DashboardContent = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Welcome back, Ajay!</Typography>

      <Grid container spacing={3} mt={1}>
        <Grid item>
          <StatCard label="Total Brands" value="12" />
        </Grid>
        <Grid item>
          <StatCard label="Live Campaigns" value="5" />
        </Grid>
        <Grid item>
          <StatCard label="Total Revenue" value="₹2.1L" />
        </Grid>
      </Grid>

      {/* Placeholder for charts or campaign activity */}
      <Box mt={5}>
        <Typography variant="h6">Analytics coming soon...</Typography>
      </Box>
    </Box>
  );
};

export default DashboardContent;

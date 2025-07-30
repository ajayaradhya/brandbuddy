import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";
import axios from "axios";
import CollabTypePieChart from "./charts/CollabTypePieChart";
import MonthlyBarChart from "./charts/MonthlyBarChart";
import ReminderCard from "./ReminderCard";

const DashboardContent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/dashboard-view`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("API error", err));
  }, []);

  if (!data) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>

      {/* Top Stats */}
      <Grid container spacing={2} mb={3}>
        <Grid item><StatCard label="Total Brands" value={data.total_brands} /></Grid>
        <Grid item><StatCard label="Total Collabs" value={data.total_collabs} /></Grid>
        <Grid item><StatCard label="Paid Amount" value={`₹${data.total_paid_amount}`} /></Grid>
        <Grid item><StatCard label="Barter Value" value={`₹${data.total_barter_value}`} /></Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <CollabTypePieChart data={data.type_counts} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MonthlyBarChart data={data.monthly_data} />
        </Grid>
      </Grid>

      {/* Reminders */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ReminderCard label="Overdue Followups" count={data.overdue_followups} />
        </Grid>
        <Grid item xs={6}>
          <ReminderCard label="Upcoming Deliveries" count={data.upcoming_deliveries} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;

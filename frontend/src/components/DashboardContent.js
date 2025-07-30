import { Box, Grid, CircularProgress } from "@mui/material";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";
import axios from "axios";
import CollabTypePieChart from "./charts/CollabTypePieChart";
import MonthlyBarChart from "./charts/MonthlyBarChart";
import ReminderCard from "./ReminderCard";
import TopBrandsCard from "./TopBrandsCard";

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

  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount) + " k";

  return (
    <Box p={3} width="100%">

      {/* Top Stats */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} md={3}>
          <StatCard label="Total Brands" value={data.total_brands} />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard label="Total Collabs" value={data.total_collabs} />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard label="Paid Amount" value={formatINR(data.total_paid_amount / 1000)} />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard label="Barter Value" value={formatINR(data.total_barter_value / 1000)} />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <CollabTypePieChart data={data.type_counts} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <MonthlyBarChart data={data.monthly_data} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <TopBrandsCard data={data.top_brands} />
        </Grid>
      </Grid>

      {/* Reminders */}
      <Grid container spacing={2} mt={2}>
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

import { Box, Grid, CircularProgress, Typography, Paper, Divider, Stack } from "@mui/material";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";
import CollabTypePieChart from "./charts/CollabTypePieChart";
import MonthlyBarChart from "./charts/MonthlyBarChart";
import ReminderCard from "./ReminderCard";
import TopBrandsCard from "./TopBrandsCard";
import GroupIcon from '@mui/icons-material/Group';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PaidIcon from '@mui/icons-material/Paid';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import api from '../setupAxios.js';

const DashboardContent = () => {
  const [data, setData] = useState(null);

  // Get user info for greeting
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || user.email || 'there';

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard-view`)
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
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        width: "100%",
        bgcolor: "linear-gradient(135deg, #f7fafd 60%, #e3f0ff 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Welcome Header */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: "transparent" }}>
        <Typography variant="h5" fontWeight={600} mb={1} color="black">
          Welcome, {userName.split(' ')[0]} 👋
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={1}>
          Your creator journey at a glance.
        </Typography>
      </Paper>

      {/* Top Stats */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Brands"
            value={data.total_brands}
            icon={<GroupIcon color="primary" />}
            gradient="linear-gradient(135deg, #e3f0ff 0%, #b6e0fe 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Collabs"
            value={data.total_collabs}
            icon={<WorkOutlineIcon color="secondary" />}
            gradient="linear-gradient(135deg, #fceabb 0%, #f8b500 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Paid Amount"
            value={formatINR(data.total_paid_amount / 1000)}
            icon={<PaidIcon sx={{ color: "#43a047" }} />}
            gradient="linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Barter Value"
            value={formatINR(data.total_barter_value / 1000)}
            icon={<CardGiftcardIcon sx={{ color: "#ff9800" }} />}
            gradient="linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)"
          />
        </Grid>
      </Grid>

      {/* Analytics Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <TrendingUpIcon color="primary" />
          <Typography variant="h6" fontWeight={700}>
            Analytics
          </Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ display: "flex" }}>
            <CollabTypePieChart data={data.type_counts} />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: "flex" }}>
            <MonthlyBarChart />
          </Grid>
        </Grid>
      </Paper>

      {/* Top Brands Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <EmojiEventsIcon color="warning" />
          <Typography variant="h6" fontWeight={700}>
            Top Brands
          </Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <TopBrandsCard data={data.top_brands} />
      </Paper>

      {/* Reminders Section */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <NotificationsActiveIcon color="error" />
          <Typography variant="h6" fontWeight={700}>
            Reminders
          </Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ReminderCard
              label="Overdue Deliveries"
              items={data.overdue_deliveries || []}
              type="overdue"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReminderCard
              label="Upcoming Deliveries"
              items={data.upcoming_deliveries || []}
              type="upcoming"
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default DashboardContent;

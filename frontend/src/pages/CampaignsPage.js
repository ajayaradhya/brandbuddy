// CampaignsPage.js
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  IconButton,
  Pagination,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';

const statusOptions = [
  'contacted',
  'no_reply',
  'in_talks',
  'confirmed',
  'delivered',
  'paid',
  'cancelled',
];

const statusColorMap = {
  contacted: '#e3f2fd',
  no_reply: '#ffebee',
  in_talks: '#fff8e1',
  confirmed: '#e8f5e9',
  delivered: '#e3f2fd',
  paid: '#f1f8e9',
  cancelled: '#ffebee',
};

const formatStatus = (status) =>
  status?.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [openDialog, setOpenDialog] = useState(null);

  const fetchCampaigns = useMemo(
    () => async () => {
      try {
        const params = {
          search,
          status: statusFilter,
          page,
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/collaborations/`,
          { params }
        );
        setCampaigns(data.results || data);
        setCount(data.count ? Math.ceil(data.count / 10) : 1);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    },
    [search, statusFilter, page]
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCampaigns();
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [fetchCampaigns]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3} fontWeight={600}>
        Campaigns
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search campaigns or brands..."
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Select
          value={statusFilter}
          displayEmpty
          onChange={handleStatusChange}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          {statusOptions.map((s) => (
            <MenuItem key={s} value={s}>
              {formatStatus(s)}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.id}>
            <Card
              sx={{
                backgroundColor: statusColorMap[campaign.status] || '#fff',
                height: '100%',
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight={600}>
                    {campaign.campaign_name}
                  </Typography>
                  <IconButton onClick={() => setOpenDialog(campaign)}>
                    <InfoIcon />
                  </IconButton>
                </Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {formatStatus(campaign.status)}
                </Typography>
                <Typography variant="body2" mt={1}>
                  <strong>Brand:</strong> {campaign.brand.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {campaign.brand.email || '—'}
                </Typography>
                <Typography variant="body2">
                  <strong>Platform:</strong> {campaign.platform}
                </Typography>
                <Typography variant="body2">
                  <strong>Type:</strong> {campaign.collab_type}
                </Typography>
                {campaign.barter_product && (
                  <Typography variant="body2">
                    <strong>Barter:</strong> {campaign.barter_product} (₹{campaign.barter_value})
                  </Typography>
                )}
                <Typography variant="body2">
                  <strong>Delivery by:</strong> {campaign.delivery_deadline}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={count}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </Box>

      <Dialog open={!!openDialog} onClose={() => setOpenDialog(null)} fullWidth maxWidth="sm">
        <DialogTitle>{openDialog?.campaign_name}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" mb={2}>
            <strong>Brand:</strong> {openDialog?.brand.name} ({openDialog?.brand.email})
          </Typography>
          <Typography variant="body2" mb={1}><strong>Status:</strong> {formatStatus(openDialog?.status)}</Typography>
          <Typography variant="body2" mb={1}><strong>Platform:</strong> {openDialog?.platform}</Typography>
          <Typography variant="body2" mb={1}><strong>Type:</strong> {openDialog?.collab_type}</Typography>
          <Typography variant="body2" mb={1}><strong>Amount:</strong> ₹{openDialog?.amount || '—'}</Typography>
          <Typography variant="body2" mb={1}><strong>Barter:</strong> {openDialog?.barter_product || '—'} (₹{openDialog?.barter_value || 0})</Typography>
          <Typography variant="body2" mb={1}><strong>Pitch Date:</strong> {openDialog?.pitch_date}</Typography>
          <Typography variant="body2" mb={1}><strong>Follow-up Date:</strong> {openDialog?.followup_date}</Typography>
          <Typography variant="body2" mb={2}><strong>Delivery Deadline:</strong> {openDialog?.delivery_deadline}</Typography>
          <Typography variant="body2"><strong>Notes:</strong> {openDialog?.notes || '—'}</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CampaignsPage;

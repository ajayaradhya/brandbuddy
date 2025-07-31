import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';
import debounce from 'lodash.debounce';

const statusColorMap = {
  in_talks: 'warning',
  delivered: 'success',
  paid: 'primary',
  declined: 'error',
};

const formatStatus = (s) =>
  s.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

const capitalize = (s) =>
  typeof s === 'string' ? s.charAt(0).toUpperCase() + s.slice(1) : s;

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCampaigns = async (query = '') => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const res = await fetch(
        `${baseUrl}/api/collaborations/?search=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setCampaigns(data.results || []);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedSearch(val);
  };

  const debouncedSearch = useCallback(
    debounce((query) => fetchCampaigns(query), 500),
    []
  );

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={600}>
        Campaigns
      </Typography>

      <TextField
        fullWidth
        placeholder="Search by brand or campaign name"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          ),
        }}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {campaigns.map((c) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={c.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                title={c.campaign_name}
                subheader={c.brand?.name}
                sx={{
                  '& .MuiCardHeader-title': {
                    fontWeight: 600,
                    fontSize: '1.1rem',
                  },
                  '& .MuiCardHeader-subheader': {
                    fontSize: '0.9rem',
                    color: 'text.secondary',
                  },
                  pb: 0,
                }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Chip
                  label={formatStatus(c.status)}
                  color={statusColorMap[c.status] || 'default'}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />

                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Platform:</strong> {capitalize(c.platform)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Type:</strong> {capitalize(c.collab_type)}
                  </Typography>
                  {c.barter_product && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Barter:</strong> {c.barter_product} (₹{parseFloat(c.barter_value).toFixed(2)})
                    </Typography>
                  )}
                  {c.delivery_deadline && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Delivery by:</strong>{' '}
                      {format(new Date(c.delivery_deadline), 'dd/MM/yyyy')}
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CampaignsPage;

import React, { useEffect, useState, useCallback } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tooltip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import debounce from 'lodash.debounce';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const fetchCampaigns = async (search = '', status = '', pageNum = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/collaborations`,
        {
          params: {
            page: pageNum,
            status: status || undefined,
            search: search || undefined
          }
        }
      );
      setCampaigns(res.data.results || []);
      setTotalPages(Math.ceil(res.data.count / 10));
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedFetch = useCallback(
    debounce((query) => {
      fetchCampaigns(query, statusFilter, 1);
    }, 400),
    [statusFilter]
  );

  useEffect(() => {
    fetchCampaigns(searchTerm, statusFilter, page);
  }, [page, statusFilter]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1);
    debouncedFetch(value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleCloseDialog = () => {
    setSelectedCampaign(null);
  };

  const renderDetailRow = (label, value) => (
    <Typography variant="body2" sx={{ mb: 0.5 }}>
      <b>{label}:</b> {value || 'N/A'}
    </Typography>
  );

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Campaigns
      </Typography>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} label="Status" onChange={handleStatusChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="contacted">Contacted</MenuItem>
            <MenuItem value="no_reply">No Reply</MenuItem>
            <MenuItem value="in_talks">In Talks</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
  <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Campaigns or Brands"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </div>

      {loading ? (
        <CircularProgress />
      ) : campaigns.length === 0 ? (
        <Typography>No campaigns found.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {campaigns.map((campaign) => (
              <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                <Card sx={{ height: '100%', borderRadius: 3 }}>
                  <CardHeader
                    avatar={
                      campaign.brand?.logo ? (
                        <Avatar src={campaign.brand.logo} />
                      ) : (
                        <Avatar>{campaign.brand?.name?.charAt(0) || '?'}</Avatar>
                      )
                    }
                    title={<b>{campaign.brand?.name || 'Unnamed Brand'}</b>}
                    subheader={campaign.status.replace(/_/g, ' ')}
                    action={
                      <Tooltip title="View Details">
                        <IconButton onClick={() => handleViewDetails(campaign)}>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  />
                  <CardContent>
                    {renderDetailRow('Platform', campaign.platform)}
                    {renderDetailRow('Type', campaign.collab_type)}
                    {campaign.collab_type === 'barter' &&
                      renderDetailRow('Barter', `${campaign.barter_item} (₹${campaign.barter_value})`)}
                    {campaign.delivery_due_date &&
                      renderDetailRow('Delivery By', new Date(campaign.delivery_due_date).toLocaleDateString())}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
            <Pagination count={totalPages} page={page} onChange={(e, val) => setPage(val)} />
          </div>
        </>
      )}

      <Dialog open={!!selectedCampaign} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Campaign Details</DialogTitle>
        <DialogContent dividers>
          {selectedCampaign && (
            <>
              {renderDetailRow('Brand', selectedCampaign.brand?.name)}
              {renderDetailRow('Email', selectedCampaign.brand?.email)}
              {renderDetailRow('Platform', selectedCampaign.platform)}
              {renderDetailRow('Type', selectedCampaign.collab_type)}
              {renderDetailRow('Status', selectedCampaign.status)}
              {selectedCampaign.collab_type === 'barter' &&
                renderDetailRow('Barter Item', `${selectedCampaign.barter_item} (₹${selectedCampaign.barter_value})`)}
              {selectedCampaign.delivery_due_date &&
                renderDetailRow('Delivery Due', new Date(selectedCampaign.delivery_due_date).toLocaleDateString())}
              {selectedCampaign.notes && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <b>Notes:</b> {selectedCampaign.notes}
                </Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CampaignsPage;

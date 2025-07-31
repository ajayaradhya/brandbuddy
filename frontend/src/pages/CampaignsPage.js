import { Add, Delete, Edit, Search } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card, CardContent,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import CampaignModal from './CampaignModal';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

const statusOptions = [
  'contacted', 'no_reply', 'in_talks', 'confirmed',
  'delivered', 'paid', 'cancelled'
];

const statusLabels = {
  contacted: 'Contacted',
  no_reply: 'No Reply',
  in_talks: 'In Talks',
  confirmed: 'Confirmed',
  delivered: 'Delivered',
  paid: 'Paid',
  cancelled: 'Cancelled',
};

const PAGE_SIZE = 8;

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const fetchCampaigns = async () => {
    const params = {
      search,
      status: statusFilter,
      page,
      page_size: PAGE_SIZE
    };
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/collaborations/`, { params });
    setCampaigns(res.data.results);
    setTotalCount(res.data.count);
  };

  useEffect(() => {
    fetchCampaigns();
  }, [search, statusFilter, page]);

  const handleDebouncedSearch = debounce((value) => {
    setPage(1);
    setSearch(value);
  }, 300);

  const handleCreate = () => {
    setSelectedCampaign(null);
    setOpenModal(true);
  };

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/collaborations/${id}/`);
    fetchCampaigns();
    setConfirmDelete({ open: false, id: null });
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <Box p={3}>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5"></Typography>
        <Button startIcon={<Add />} variant="contained" onClick={handleCreate}>Add Campaign</Button>
      </Box>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          placeholder="Search Campaigns or Brands..."
          variant="outlined"
          fullWidth
          onChange={(e) => handleDebouncedSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          displayEmpty
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {statusLabels[status]}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Grid container spacing={2}>
        {campaigns.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card sx={{ minWidth: 280 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" noWrap>{item.campaign_name}</Typography>
                  <Box>
                    <IconButton onClick={() => handleEdit(item)}><Edit /></IconButton>
                    <IconButton onClick={() => setConfirmDelete({ open: true, id: item.id })}><Delete /></IconButton>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Avatar src={item.brand?.logo} sx={{ width: 24, height: 24 }} />
                  <Typography variant="body2">{item.brand?.name}</Typography>
                </Box>

                <Typography variant="caption" color="textSecondary">
                  {statusLabels[item.status]}
                </Typography>

                <Box mt={1}>
                  <Typography variant="body2"><b>Platform:</b> {item.platform}</Typography>
                  <Typography variant="body2"><b>Type:</b> {item.collab_type}</Typography>

                  {item.collab_type === 'barter' && (
                    <>
                      <Typography variant="body2"><b>Barter:</b> {item.barter_product}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <b>Value:</b> ₹{Number(item.barter_value).toFixed(2)}
                      </Typography>
                    </>
                  )}

                  {item.delivery_deadline && (
                    <Typography variant="body2"><b>Delivery by:</b> {item.delivery_deadline}</Typography>
                  )}
                </Box>

                {item.notes && (
                  <Typography variant="body2" sx={{ mt: 1 }} noWrap title={item.notes}>
                    <b>Notes:</b> {item.notes}
                  </Typography>
                )}

                {item.brand?.email && (
                  <Typography variant="caption" color="textSecondary">
                    {item.brand.email}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center" gap={1}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "contained" : "outlined"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </Box>
      )}

      {/* Modals */}
      <CampaignModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        campaign={selectedCampaign}
        onSuccess={() => {
          fetchCampaigns();
          setOpenModal(false);
        }}
      />

      <ConfirmDeleteDialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, id: null })}
        onConfirm={() => handleDelete(confirmDelete.id)}
      />
    </Box>
  );
}

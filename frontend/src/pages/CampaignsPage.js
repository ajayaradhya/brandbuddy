import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Chip,
  Pagination,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import dayjs from 'dayjs';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchCampaigns();
  }, [searchTerm, statusFilter, typeFilter, page]);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/collaborations`, {
        params: {
          search: searchTerm,
          status: statusFilter,
          collab_type: typeFilter,
          page,
          page_size: pageSize,
        },
      });
      setCampaigns(response.data.results);
      setCount(response.data.count);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const formatDate = (date) => (date ? dayjs(date).format('MMM DD, YYYY') : '-');

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Campaigns
      </Typography>

      {/* Filters */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <TextField
          placeholder="Search Campaigns or Brands..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // reset page on search
          }}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1); // reset page on filter
            }}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="in_talks">In Talks</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1); // reset page on filter
            }}
            label="Type"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="barter">Barter</MenuItem>
            <MenuItem value="gifted">Gifted</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Campaign Table */}
      <Paper sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>Campaign</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Pitch</TableCell>
              <TableCell>Follow-Up</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Deliverables</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <a
                    href={item.brand.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: '#1976d2' }}
                  >
                    {item.brand.name}
                  </a>
                </TableCell>
                <TableCell>{item.campaign_name}</TableCell>
                <TableCell>{item.platform}</TableCell>
                <TableCell>
                  <Chip
                    label={item.collab_type}
                    color={
                      item.collab_type === 'paid'
                        ? 'success'
                        : item.collab_type === 'barter'
                        ? 'primary'
                        : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip label={item.status} variant="outlined" size="small" />
                </TableCell>
                <TableCell>{formatDate(item.pitch_date)}</TableCell>
                <TableCell>{formatDate(item.followup_date)}</TableCell>
                <TableCell>{formatDate(item.delivery_deadline)}</TableCell>
                <TableCell>
                  {item.amount ? `₹${parseFloat(item.amount).toFixed(2)}` : '-'}
                </TableCell>
                <TableCell>{item.deliverables}</TableCell>
                <TableCell>{item.notes || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Pagination Controls */}
      <Stack spacing={2} alignItems="center" mt={3}>
        <Pagination
          count={Math.ceil(count / pageSize)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Stack>
    </Container>
  );
};

export default CampaignsPage;

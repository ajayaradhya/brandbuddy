import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Tooltip,
  Chip,
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import PublicIcon from '@mui/icons-material/Public';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [editingBrand, setEditingBrand] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/brands`);
      setBrands(res.data);
    } catch (err) {
      console.error('Error fetching brands:', err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleEdit = (brand) => {
    setEditingBrand({ ...brand });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingBrand(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/brands/${editingBrand.id}/`, editingBrand);
      fetchBrands();
      handleClose();
    } catch (err) {
      console.error('Error saving brand:', err);
    }
  };

  const handleChange = (e) => {
    setEditingBrand({ ...editingBrand, [e.target.name]: e.target.value });
  };

  return (
    <Box p={3}>
      {/* <Typography variant="h5" fontWeight="bold" mb={3}>
        Partnered Brands
      </Typography> */}

      <Grid container spacing={3}>
        {brands.map((brand) => (
          <Grid item xs={12} sm={6} md={4} key={brand.id}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6">{brand.name}</Typography>
                  <Tooltip title="Edit Brand">
                    <IconButton size="small" onClick={() => handleEdit(brand)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                {brand.category && (
                  <Chip label={brand.category} size="small" sx={{ mb: 1 }} color="black" />
                )}

                <Box display="flex" flexDirection="column" gap={1} mt={1}>
                  {brand.email && (
                    <Typography variant="body2">
                      <EmailIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      {brand.email}
                    </Typography>
                  )}
                  {brand.phone && (
                    <Typography variant="body2">
                      <PhoneIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      {brand.phone}
                    </Typography>
                  )}
                  {brand.website && (
                    <Typography variant="body2">
                      <PublicIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      <a href={brand.website} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                        {brand.website}
                      </a>
                    </Typography>
                  )}
                  {brand.instagram_handle && (
                    <Typography variant="body2">
                      <InstagramIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      
                      <a href={brand.instagram_handle} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                        {brand.instagram_handle}
                      </a>
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Brand Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Brand Info</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {editingBrand && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Name" name="name" fullWidth value={editingBrand.name} onChange={handleChange} />
              <TextField label="Email" name="email" fullWidth value={editingBrand.email || ''} onChange={handleChange} />
              <TextField label="Phone" name="phone" fullWidth value={editingBrand.phone || ''} onChange={handleChange} />
              <TextField label="Website" name="website" fullWidth value={editingBrand.website || ''} onChange={handleChange} />
              <TextField label="Instagram" name="instagram_handle" fullWidth value={editingBrand.instagram_handle || ''} onChange={handleChange} />
              <TextField label="Category" name="category" fullWidth value={editingBrand.category || ''} onChange={handleChange} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BrandsPage;

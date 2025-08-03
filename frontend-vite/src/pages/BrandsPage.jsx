import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  InputAdornment,
  Box, // <-- Add Box for layout
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add'; // <-- Import Add icon
import api from '../setupAxios';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const debounceTimeoutRef = useRef(null);

  const fetchBrands = async (query = '') => {
    try {
      setLoading(true);
      const response = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/brands?search=${query}`
      );
      setBrands(response.data);
    } catch (err) {
      console.error('Failed to fetch brands:', err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback((query) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      fetchBrands(query);
    }, 400); // debounce delay in ms
  }, []);

  useEffect(() => {
    fetchBrands(); // initial load
  }, []);

  const handleEditClick = (brand) => {
    setSelectedBrand({ ...brand });
    setPreviewUrl(brand.logo || null);
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedBrand(null);
    setLogoFile(null);
    setPreviewUrl(null);
    setEditDialogOpen(false);
  };

  const handleInputChange = (e) => {
    setSelectedBrand({
      ...selectedBrand,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Add this function to handle create
  const handleCreateBrand = () => {
    setSelectedBrand({
      name: '',
      website: '',
      instagram_handle: '',
      email: '',
      phone: '',
      category: '',
      logo: null,
    });
    setLogoFile(null);
    setPreviewUrl(null);
    setEditDialogOpen(true);
  };

  // Update handleSave to POST if no id (new brand)
  const handleSave = async () => {
    if (!selectedBrand) return;
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(selectedBrand).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (logoFile) {
        formData.append('logo', logoFile);
      }

      let res;
      if (selectedBrand.id) {
        // Update existing brand
        res = await api.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/brands/${selectedBrand.id}/`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        const updated = brands.map((b) => (b.id === res.data.id ? res.data : b));
        setBrands(updated);
      } else {
        // Create new brand
        res = await api.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/brands/`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setBrands([res.data, ...brands]);
      }
      handleDialogClose();
    } catch (err) {
      console.error('Failed to save brand:', err);
    } finally {
      setSaving(false);
    }
  };

  const getInstagramLink = (handle) => {
    if (!handle) return null;
    const username = handle.startsWith('@') ? handle.substring(1) : handle;
    return `https://www.instagram.com/${username}`;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedFetch(query);
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Top bar with Create Brand button */}
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          Brand Partners
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleCreateBrand}
        >
          Create Brand
        </Button>
      </Box>

      <TextField
        placeholder="Search Brands..."
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        slots={{ inputAdornment: InputAdornment }}
        slotProps={{
          inputAdornment: {
            position: 'start',
            children: <SearchIcon />,
          },
        }}
      />

      {loading ? (
        <CircularProgress />
      ) : brands.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No brands found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {brands.map((brand) => (
            <Grid item xs={12} sm={6} md={4} key={brand.id}>
              <Card
                elevation={4}
                sx={{
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': { transform: 'scale(1.02)' },
                  borderRadius: 2,
                }}
              >
                <CardHeader
                  avatar={
                    brand.logo ? (
                      <Avatar src={brand.logo} />
                    ) : (
                      <Avatar>{brand.name.charAt(0)}</Avatar>
                    )
                  }
                  action={
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditClick(brand)} disabled={true}>
                        <EditIcon/>
                      </IconButton>
                    </Tooltip>
                  }
                  title={
                    <Typography fontWeight={600} variant="h6">
                      {brand.name}
                    </Typography>
                  }
                  subheader={brand.category || 'Uncategorized'}
                />
                <CardContent>
                  {brand.instagram_handle && (
                    <Typography>
                      <b>Instagram:</b>{' '}
                      <a
                        href={getInstagramLink(brand.instagram_handle)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {brand.instagram_handle}
                      </a>
                    </Typography>
                  )}
                  {brand.website && (
                    <Typography>
                      <b>Website:</b>{' '}
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {brand.website}
                      </a>
                    </Typography>
                  )}
                  {brand.email && (
                    <Typography>
                      <b>Email:</b> {brand.email}
                    </Typography>
                  )}
                  {brand.phone && (
                    <Typography>
                      <b>Phone:</b> {brand.phone}
                    </Typography>
                  )}
                  <Typography variant="caption" color="textSecondary">
                    Created on {new Date(brand.created_at).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={editDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Brand</DialogTitle>
        <DialogContent>
          {selectedBrand && (
            <>
              <TextField fullWidth margin="dense" label="Name" name="name" value={selectedBrand.name} onChange={handleInputChange} />
              <TextField fullWidth margin="dense" label="Website" name="website" value={selectedBrand.website || ''} onChange={handleInputChange} />
              <TextField fullWidth margin="dense" label="Instagram Handle" name="instagram_handle" value={selectedBrand.instagram_handle || ''} onChange={handleInputChange} />
              <TextField fullWidth margin="dense" label="Email" name="email" value={selectedBrand.email || ''} onChange={handleInputChange} />
              <TextField fullWidth margin="dense" label="Phone" name="phone" value={selectedBrand.phone || ''} onChange={handleInputChange} />
              <TextField fullWidth margin="dense" label="Category" name="category" value={selectedBrand.category || ''} onChange={handleInputChange} />
              
              <div style={{ marginTop: '1rem' }}>
                <Typography variant="subtitle2">Logo Upload</Typography>
                <input type="file" accept="image/*" onChange={handleLogoChange} style={{ marginTop: '8px' }} />
                {previewUrl && (
                  <div style={{ marginTop: '10px' }}>
                    <Typography variant="caption">Preview:</Typography>
                    <Avatar src={previewUrl} alt="Preview" sx={{ width: 60, height: 60, mt: 1 }} />
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BrandsPage;

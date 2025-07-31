import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Grid, Select,
  InputLabel, FormControl
} from '@mui/material';
import axios from 'axios';

const statusOptions = [
  'contacted', 'no_reply', 'in_talks', 'confirmed',
  'delivered', 'paid', 'cancelled'
];

const collabTypes = ['barter', 'paid'];
const platforms = ['instagram', 'youtube', 'blog', 'other'];

export default function CampaignModal({ open, onClose, campaign, onSuccess }) {
  const [form, setForm] = useState({
    campaign_name: '',
    status: 'contacted',
    collab_type: 'barter',
    platform: 'instagram',
    delivery_deadline: '',
    barter_product: '',
    barter_value: '',
    brand_id: '',
    notes: '',
  });

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/brands/`)
      .then(res => setBrands(res.data));
  }, []);

  useEffect(() => {
    if (campaign) {
      setForm({
        ...campaign,
        brand_id: campaign.brand?.id || '',
        delivery_deadline: campaign.delivery_deadline || '',
        barter_product: campaign.barter_product || '',
        barter_value: campaign.barter_value || '',
        notes: campaign.notes || '',
      });
    } else {
      setForm({
        campaign_name: '',
        status: 'contacted',
        collab_type: 'barter',
        platform: 'instagram',
        delivery_deadline: '',
        barter_product: '',
        barter_value: '',
        brand_id: '',
        notes: '',
      });
    }
  }, [campaign]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      brand_id: form.brand_id,
    };
    try {
      if (campaign?.id) {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/collaborations/${campaign.id}/`, payload);
      } else {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/collaborations/`, payload);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Save error:', err.response?.data || err.message);
      alert('Failed to save. Check the form and try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{campaign ? 'Edit Campaign' : 'New Campaign'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField
              label="Campaign Name"
              name="campaign_name"
              value={form.campaign_name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={form.status} label="Status" onChange={handleChange}>
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select name="collab_type" value={form.collab_type} label="Type" onChange={handleChange}>
                {collabTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Platform</InputLabel>
              <Select name="platform" value={form.platform} label="Platform" onChange={handleChange}>
                {platforms.map(p => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Delivery Deadline"
              name="delivery_deadline"
              type="date"
              value={form.delivery_deadline || ''}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {form.collab_type === 'barter' && (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Barter Product"
                  name="barter_product"
                  value={form.barter_product}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Barter Value"
                  name="barter_value"
                  type="number"
                  value={form.barter_value}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select
                name="brand_id"
                value={form.brand_id}
                label="Brand"
                onChange={handleChange}
              >
                {brands.map(b => (
                  <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

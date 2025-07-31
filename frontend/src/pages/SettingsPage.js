import { Box, Typography, Paper, Divider, Switch, FormControlLabel } from '@mui/material';
import { useState } from 'react';

const SettingsView = () => {
  // Example state for notification preferences
  const [emailNotif, setEmailNotif] = useState(true);
  const [inAppNotif, setInAppNotif] = useState(true);

  // You can later replace these with API calls to save preferences
  const handleEmailNotifChange = (event) => {
    setEmailNotif(event.target.checked);
    // TODO: Save to backend
  };

  const handleInAppNotifChange = (event) => {
    setInAppNotif(event.target.checked);
    // TODO: Save to backend
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        {/* <Typography variant="h5" fontWeight={700} mb={2}>
          Settings
        </Typography>
        <Divider sx={{ mb: 3 }} /> */}

        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Profile
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Update your name, email, or profile picture.
        </Typography>

        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Notifications
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Manage your notification preferences.
        </Typography>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={emailNotif}
                onChange={handleEmailNotifChange}
                color="primary"
              />
            }
            label="Email notifications"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={inAppNotif}
                onChange={handleInAppNotifChange}
                color="primary"
              />
            }
            label="In-app notifications"
          />
        </Box>

        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Security
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Change your password or review recent activity.
        </Typography>
      </Paper>
    </Box>
  );
};

export default SettingsView;
import { Box, Typography, Paper, Divider } from '@mui/material';

const SettingsView = () => (
  <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Settings
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Profile
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Update your name, email, or profile picture.
      </Typography>

      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Notifications
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Manage your notification preferences.
      </Typography>

      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Security
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Change your password or review recent activity.
      </Typography>
    </Paper>
  </Box>
);

export default SettingsView;
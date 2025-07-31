import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Badge from '@mui/material/Badge';

const routeToTitle = {
  '/': 'Dashboard',
  '/brands': 'Brands',
  '/campaigns': 'Campaigns',
  '/calendar': 'Calendar',
  '/settings': 'Settings',
};

const TopNavigationBar = ({ setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = routeToTitle[location.pathname] || 'BrandBuddy';

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // User info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const avatarUrl = user.picture || '/static/images/avatar/1.jpg';
  const userName = user.name || user.email || 'User';
  const userEmail = user.email || '';

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    // Example notifications
    { id: 1, text: 'Test Notification 1', read: true, time: '2h ago' },
    { id: 2, text: 'Test Notification 1', read: true, time: '1d ago' },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleAvatarClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setDialogOpen(false);
    navigate('/login');
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={6}
        sx={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          color: 'black',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          borderBottom: '1px solid #eaeaea',
          zIndex: 1201,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setMobileOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, letterSpacing: 0.5 }}
            >
              {pageTitle}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              size="small"
              sx={{ color: 'inherit' }}
              onClick={() => setNotifOpen(true)}
            >
              <Badge
                color="error"
                badgeContent={unreadCount}
                invisible={unreadCount === 0}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Box>
              <Avatar
                alt={userName}
                src={avatarUrl}
                sx={{
                  width: 36,
                  height: 36,
                  border: '2px solid #ccc',
                  transition: '0.3s',
                  '&:hover': {
                    borderColor: '#555',
                    cursor: 'pointer',
                  },
                }}
                onClick={handleAvatarClick}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 2, bgcolor: '#fafbfc' },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 0 }}>
          <Avatar
            alt={userName}
            src={avatarUrl}
            sx={{
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 1,
              border: '2px solid #1976d2',
            }}
          />
          <Typography variant="h6" fontWeight={700}>
            {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userEmail}
          </Typography>
        </DialogTitle>
        <Divider sx={{ my: 2 }} />
        <DialogContent sx={{ textAlign: 'center', pb: 0 }}>
          <Typography variant="body2" color="text.secondary" mb={2}>
            You are logged in to BrandBuddy.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            fullWidth
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 2, bgcolor: '#fafbfc' } }}
      >
        <DialogTitle>Notifications</DialogTitle>
        <Divider sx={{ mb: 1 }} />
        <DialogContent>
          {notifications.length === 0 ? (
            <Typography color="text.secondary">No notifications</Typography>
          ) : (
            notifications.map((n) => (
              <Box key={n.id} sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  color={n.read ? 'text.secondary' : 'text.primary'}
                >
                  {n.text}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {n.time}
                </Typography>
              </Box>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotifOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TopNavigationBar;

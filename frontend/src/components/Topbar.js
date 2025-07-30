import { AppBar, Toolbar, Typography, Box, Avatar, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import logo from './logo.svg'; // Add a logo or icon if available

const routeToTitle = {
  '/': 'Dashboard',
  '/brands': 'Brands',
  '/campaigns': 'Campaigns',
  '/calendar': 'Brand Calendar',
  '/settings': 'Settings',
};

const TopBar = () => {
  const location = useLocation();
  const pageTitle = routeToTitle[location.pathname] || 'BrandBuddy';

  return (
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
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* <img src={logo} alt="Logo" style={{ width: 32, height: 32 }} /> */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, letterSpacing: 0.5 }}
          >
            {pageTitle}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton size="small" sx={{ color: 'inherit' }}>
            <NotificationsIcon />
          </IconButton>
          <Avatar
            alt="Ajay"
            src="/static/images/avatar/1.jpg"
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
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

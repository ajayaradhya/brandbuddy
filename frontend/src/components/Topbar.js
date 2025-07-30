import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';

const routeToTitle = {
  '/': 'Dashboard',
  '/brands': 'Brands',
  '/campaigns': 'Campaigns',
  '/calendar': 'Calendar',
  '/settings': 'Settings',
};

const TopBar = ({ setMobileOpen }) => {
  const location = useLocation();
  const pageTitle = routeToTitle[location.pathname] || 'BrandBuddy';

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
  Box,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, setMobileOpen, isMobile }) => {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Brands', icon: <PeopleIcon />, path: '/brands' },
    { text: 'Campaigns', icon: <CampaignIcon />, path: '/campaigns' },
    { text: 'Calendar', icon: <CalendarMonthIcon />, path: '/calendar' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const drawerContent = (
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          sx={{ ml: 1, fontWeight: 700, color: '#000' }}
        >
          BrandBuddy
        </Typography>
      </Toolbar>
      <List sx={{ mt: 1 }}>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;

          return (
            <ListItem
              key={text}
              component={NavLink}
              to={path}
              button
              onClick={() => isMobile && setMobileOpen(false)}
              sx={{
                mb: 0.5,
                mx: 1,
                borderRadius: 1,
                color: isActive ? '#000000' : '#3a3a3aff',
                backgroundColor: isActive ? '#f3e5f5' : 'transparent',
                '&:hover': { backgroundColor: '#eeeeeeff' },
                '&.active': { backgroundColor: '#ddddddff' },
              }}
              className={isActive ? 'active' : ''}
            >
              <Tooltip title={text} placement="right" arrow>
                <ListItemIcon sx={{ color: isActive ? '#000' : '#888' }}>
                  {icon}
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 'bold' : 'medium',
                }}
              />
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
    </div>
  );

  return (
    <>
      {/* Mobile temporary drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Desktop permanent drawer
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#fff',
              borderRight: '1px solid #e0e0e0',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;

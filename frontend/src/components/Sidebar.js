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

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Brands', icon: <PeopleIcon />, path: '/brands' },
    { text: 'Campaigns', icon: <CampaignIcon />, path: '/campaigns' },
    { text: 'Calendar', icon: <CalendarMonthIcon />, path: '/calendar' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ ml: 1, fontWeight: 700, color: '#000000ff' }}
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
              sx={{
                mb: 0.5,
                mx: 1,
                borderRadius: 1,
                color: isActive ? '#000000ff' : '#555',
                backgroundColor: isActive ? '#f3e5f5' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                },
                '&.active': {
                  backgroundColor: '#f3e5f5',
                },
              }}
              className={isActive ? 'active' : ''}
            >
              <Tooltip title={text} placement="right" arrow>
                <ListItemIcon sx={{ color: isActive ? '#000000ff' : '#888' }}>
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
    </Drawer>
  );
};

export default Sidebar;

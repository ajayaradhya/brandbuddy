import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon /> },
          { text: 'Brands', icon: <PeopleIcon /> },
          { text: 'Campaigns', icon: <CampaignIcon /> },
          { text: 'Settings', icon: <SettingsIcon /> },
        ].map(({ text, icon }) => (
          <ListItem button key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

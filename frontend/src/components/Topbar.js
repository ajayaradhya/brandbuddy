import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';

const TopBar = () => {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">BrandBuddy Dashboard</Typography>
        <Box>
          <Avatar alt="Ajay" src="/static/images/avatar/1.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

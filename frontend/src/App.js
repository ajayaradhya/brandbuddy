import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import TopBar from './components/Topbar';
import DashboardContent from './components/DashboardContent';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
        <TopBar />
        <DashboardContent />
      </Box>
    </Box>
  );
}

export default App;

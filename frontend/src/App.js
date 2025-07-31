import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

import DashboardContent from './components/DashboardContent';
import BrandsPage from './pages/BrandsPage';
import CalendarView from './pages/CalendarView';
import CampaignsPage from './pages/CampaignsPage';
import SettingsPage from './pages/SettingsPage';

import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Router>
      <CssBaseline />
      <Routes>
        {/* Login route: no sidebar/topbar */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes: sidebar/topbar/layout */}
        <Route
          path="*"
          element={
            <Box sx={{ display: 'flex' }}>
              <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isMobile={isMobile} />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  bgcolor: '#f4f6f8',
                  minHeight: '100vh',
                  width: { sm: `calc(100% - 240px)` },
                }}
              >
                <TopBar setMobileOpen={setMobileOpen} />
                <Routes>
                  <Route path="/" element={<ProtectedRoute><DashboardContent /></ProtectedRoute>} />
                  <Route path="/brands" element={<ProtectedRoute><BrandsPage /></ProtectedRoute>} />
                  <Route path="/campaigns" element={<ProtectedRoute><CampaignsPage /></ProtectedRoute>} />
                  <Route path="/calendar" element={<ProtectedRoute><CalendarView /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                  {/* Future: Add more protected routes here */}
                  <Route path="*" element={<Box p={4}><h2>404 - Page Not Found</h2></Box>} />
                </Routes>
              </Box>
            </Box>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

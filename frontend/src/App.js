import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

import DashboardContent from './components/DashboardContent';
import BrandsPage from './pages/BrandsPage';
import CampaignsPage from './pages/CampaignsPage';
import CalendarView from './pages/CalendarView';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
          <TopBar />
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;

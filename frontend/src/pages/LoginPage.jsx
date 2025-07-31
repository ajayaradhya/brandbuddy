import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Divider,
  Stack,
} from '@mui/material';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Google as GoogleIcon } from '@mui/icons-material';

const taglines = [
  "Turn Brand Deals into Brand Wins",
  "Collaborate Smarter. Deliver Better.",
  "Built for Creators Who Mean Business",
  "Where Creators Manage, Track, and Thrive",
  "One Dashboard. Every Brand Deal.",
];

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [taglineIndex, setTaglineIndex] = useState(0);

  const exchangeIdTokenForToken = async (idToken) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/dj-rest-auth/google/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: idToken }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token || '');
        localStorage.setItem('refresh_token', data.refresh_token || '');
        navigate('/');
      } else {
        setError(data?.detail || 'Token exchange failed');
        setLoading(false);
      }
    } catch (err) {
      setError('Error exchanging token');
      setLoading(false);
    }
  };

  useEffect(() => {
    const idToken = searchParams.get('id_token');
    if (idToken) {
      exchangeIdTokenForToken(idToken);
    }
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#acacacff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          px: 6,
          py: 5,
          borderRadius: 4,
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
          bgcolor: '#1a1a1a',
          color: 'white',
          animation: 'fadeIn 0.6s ease',
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mx: 'auto',
            mb: 2,
            bgcolor: '#333',
          }}
        >
          <GoogleIcon sx={{ color: '#ffffffff' }} />
        </Avatar>

        <Typography variant="h4" fontWeight="bold" mb={1}>
          Brand Buddy
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#bbb', mb: 3, minHeight: 24, transition: 'opacity 0.4s ease-in-out' }}
        >
          {taglines[taglineIndex]}
        </Typography>

        <Divider sx={{ bgcolor: '#444', mb: 3 }} />

        {loading ? (
          <Stack spacing={2} alignItems="center">
            <CircularProgress color="inherit" />
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              Logging in securely...
            </Typography>
          </Stack>
        ) : (
          <GoogleLoginButton />
        )}

        {error && (
          <Typography variant="body2" color="error" mt={3}>
            {error}
          </Typography>
        )}
      </Paper>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default LoginPage;

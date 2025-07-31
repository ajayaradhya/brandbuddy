import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import GoogleLoginButton from '../components/GoogleLoginButton';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Exchanges Google ID token for backend tokens
  const exchangeIdTokenForToken = async (idToken) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/dj-rest-auth/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: idToken }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token || '');
        localStorage.setItem('refresh_token', data.refresh_token || '');
        navigate('/'); // Redirect to dashboard
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f4f6fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 6,
          borderRadius: 4,
          minWidth: 340,
          maxWidth: 380,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={2} color="primary">
          Brand Buddy
        </Typography>
        <Typography variant="subtitle1" mb={4} color="text.secondary">
          Your influencer marketing dashboard
        </Typography>
        {loading ? (
          <Typography variant="body1" color="text.secondary">
            Logging in...
          </Typography>
        ) : (
          <GoogleLoginButton />
        )}
        {error && (
          <Typography variant="body2" color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;

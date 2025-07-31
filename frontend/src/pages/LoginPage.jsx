import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
        body: JSON.stringify({
          id_token: idToken,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token || '');
        localStorage.setItem('refresh_token', data.refresh_token || '');
        navigate('/dashboard');
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-semibold mb-6">Login to BrandBuddy</h2>
        {loading ? <p>Logging in...</p> : <GoogleLoginButton />}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;

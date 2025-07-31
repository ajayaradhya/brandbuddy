import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch('http://localhost:8000/dj-rest-auth/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          redirect_uri: 'http://localhost:3000/login',
        }),
        credentials: 'include', // include cookies if needed
      });

      const data = await response.json();

      if (response.ok) {
        // Store token securely (localStorage/sessionStorage ideally with refresh strategy)
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        navigate('/dashboard'); // Or wherever your app's main page is
      } else {
        console.error('Token exchange failed:', data);
      }
    } catch (error) {
      console.error('Error exchanging code:', error);
    }
  };

  useEffect(() => {
    const code = searchParams.get('code');
    console.log("code " + code)
    if (code) {
      setLoading(true);
      exchangeCodeForToken(code);
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-semibold mb-6">Login to BrandBuddy</h2>
        {loading ? <p>Logging in...</p> : <GoogleLoginButton />}
      </div>
    </div>
  );
};

export default LoginPage;

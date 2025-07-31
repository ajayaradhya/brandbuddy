import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:8000/dj-rest-auth/google/', {
        access_token: credentialResponse.credential,  // This is the Google access token
      });

      console.log('Login Success:', response.data);
      // Save tokens, redirect, etc.
    } catch (error) {
      console.error('Login Failed:', error.response?.data || error.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId="2088540553-d4n5kbui8p5tkbef06q7kdpkl432gsr2.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

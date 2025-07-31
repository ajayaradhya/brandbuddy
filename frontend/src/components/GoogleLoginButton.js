import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  // Handles successful login and redirects with code
  const handleSuccess = (credentialResponse) => {
    // Send the ID token to /login with id_token param
    if (credentialResponse.credential) {
      window.location.href = `/login?id_token=${credentialResponse.credential}`;
    } else {
      alert('Google login did not return an ID token.');
    }
  };

  return (
    <GoogleOAuthProvider clientId="2088540553-d4n5kbui8p5tkbef06q7kdpkl432gsr2.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          alert('Google login failed');
        }}
        useOneTap={false}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

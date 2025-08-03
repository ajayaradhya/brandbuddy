import { GoogleLogin } from '@react-oauth/google';

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
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        alert('Google login failed');
      }}
      useOneTap={false}
    />
  );
};

export default GoogleLoginButton;

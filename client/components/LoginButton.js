import React from 'react'
import SocialLogin from 'react-social-login'
 
const Button = ({ children, triggerLogin, provider, appId, onLoginSuccess, onLoginFailure }) => (
  <button 
  onClick={triggerLogin} 
  provider={provider} 
  appId={appId}
  // onLoginSuccess={handleSocialLogin}
  // onLoginFailure={handleSocialLoginFailure}
  >
    { children }
  </button>
)

export default SocialLogin(Button);
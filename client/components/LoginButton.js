import React from 'react'
import SocialLogin from 'react-social-login'

/*
const Button = ({ children, triggerLogin, provider, appId, onLoginSuccess, onLoginFailure }) => (
  <button 
  onClick={triggerLogin} 
  provider={provider} 
  appId={appId}
  >
    { children }
  </button>
)
*/

const Button = (props) => {
  <a href="/auth/google"><button>Log in with Google! </button></a>
}

export default SocialLogin(Button);
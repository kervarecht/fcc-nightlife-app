import React, {Component} from 'react';
import LoginButton from './LoginButton';

class SocialLogin extends Component {
    constructor(props){
        super(props);
        this.handleSocialLogin = this.handleSocialLogin.bind(this);
        this.handleSocialLoginFailure = this.handleSocialLoginFailure.bind(this);
    }

    handleSocialLogin(user) {
        console.log(user)
      }
       
    handleSocialLoginFailure(err) {
        console.error(err)
      }
       
      render(){
          return (
            <div>
            <LoginButton
                provider='google'
                appId='YOUR_APP_ID'
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
            >
                Login with Google
            </LoginButton>
            </div>
          )
      }
    
}
  
export default SocialLogin;
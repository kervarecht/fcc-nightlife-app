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
                appId='730225734394-ho5lo2r8be9pftth8uf04r6av962tmqk.apps.googleusercontent.com'
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
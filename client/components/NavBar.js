import React, {Component} from 'react';
import SocialLogin from './SocialLogin'
import LoginButton from './LoginButton';


class NavBar extends Component {
    /*
    constructor(props){
        super(props);
    }*/

    render(){
        return(
        <div className="NavBar">
            <h1 className="app-title"><a href="/">Findr </a></h1>
            <a href="http://localhost:3000/auth/google"><button>Log in with Google! </button></a>
            </div>
        )
    }
}

export default NavBar;
import React, {Component} from 'react';
import SocialLogin from './SocialLogin'


class NavBar extends Component {
    /*
    constructor(props){
        super(props);
    }*/

    render(){
        return(
        <div className="NavBar">
            <h1 className="app-title"><a href="/">Findr </a></h1>
                <SocialLogin />
            </div>
        )
    }
}

export default NavBar;
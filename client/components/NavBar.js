import React, {Component} from 'react';



class NavBar extends Component {
    /*
    constructor(props){
        super(props);
    }*/

    render(){
        return(
        <div className="NavBar">
            <h1 className="app-title"><a href="/">Findr </a></h1>
            <a href="http://localhost:3000/auth/google"><div className="g-signin">Sign In with Google</div></a>
            </div>
        )
    }
}

export default NavBar;
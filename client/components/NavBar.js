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
            <ul>
                
                <li><a href="/login.html">Login</a></li>
                </ul>
            </div>
        )
    }
}

export default NavBar;
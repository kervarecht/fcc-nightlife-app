import React, {Component} from 'react';

class NavBar extends Component {
    /*
    constructor(props){
        super(props);
    }*/

    render(){
        return(
        <div className="NavBar">
            <ul>
                <li><a href="/">Home </a></li>
                <li><a href="/login.html">Login</a></li>
                </ul>
            </div>
        )
    }
}

export default NavBar;
import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.scss';
import NavBar from "./components/NavBar.js"

const App = () => {
    return (
        <div class="App">
            <NavBar />
            </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
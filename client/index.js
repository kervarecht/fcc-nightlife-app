import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.scss';
import NavBar from "./components/NavBar.js"
import IndexApp from "./components/IndexApp.js"

const App = () => {
    return (
        <div class="App">
            <NavBar />
            <IndexApp />
            </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
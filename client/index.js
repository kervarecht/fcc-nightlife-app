import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';
import HelloWorld from "./components/HelloWorld";

const App = () => {
    return (
        <div class="App">
            <HelloWorld />
            </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
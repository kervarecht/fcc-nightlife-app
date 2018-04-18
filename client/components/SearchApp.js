import React, {Component} from 'react';

class SearchApp extends Component {
    constructor(props){
        super(props);
        this.state= {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    handleChange(){
        this.setState({"value": event.target.value});
    }

    handleSearch(){
        const search = this.state.value;
        this.props.handleSearch(search);
        this.setState({"value": ""});
    }

    render(){
        return (
            <div className="SearchApp">
                <span className="search-bar">
                    <input type="text" className="search-input" onKeyUp={this.handleChange}></input>
                    <button className="Search" onClick={this.handleSearch}>Search</button>
                    </span>
                </div>
        )
    }
}

export default SearchApp;
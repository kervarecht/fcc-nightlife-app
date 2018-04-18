import React, {Component} from 'react';
import YelpResults from './YelpResults';
import SearchApp from './SearchApp';

class IndexApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: ""
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(value){
        //pass this into SearchApp so it can grab the searched location with which to generate YelpResults
        this.setState({"search": value}, () => {
            console.log(this.state.search);
        });
        //console.log(this.state.search)
    }

    render(){
        return(
            <div className="IndexApp">
                <SearchApp handleSearch={this.handleSearch} />
                <YelpResults />
                </div>
        )
    }
}

export default IndexApp;
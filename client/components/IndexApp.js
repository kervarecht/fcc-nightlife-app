import React, {Component} from 'react';
import YelpResults from './YelpResults';
import SearchApp from './SearchApp';

class IndexApp extends Component {

    handleSearch(){
        //pass this into SearchApp so it can grab the seached location with which to generate YelpResults
    }

    render(){
        return(
            <div className="IndexApp">
                <SearchApp />
                <YelpResults />
                </div>
        )
    }
}

export default IndexApp;
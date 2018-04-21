import React, {Component} from 'react';
import YelpResults from './YelpResults';
import SearchApp from './SearchApp';

const exampleFetchOne = {
    name: "Great Restaurant",
    address: "115 Charming Street",
    image_url: "https://i.imgur.com/pHIgVhh.jpg",
    zip_code: "06067",
    going: 'No'
}

const exampleFetchTwo = {
    name: "Bob's Restaurant",
    address: "1145 DeBwan Street",
    zip_code: '15486',
    image_url: "https://i.imgur.com/EyY6ivm.jpg",
    going: 'No'
}

class IndexApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: "",
            restaurants: [exampleFetchOne, exampleFetchTwo]
        }
        this.handleSearch = this.handleSearch.bind(this);
        
    }

    
    handleSearch(value){ //passed into SearchApp to grab the searched location
        const self = this; //avoid window object 'this' in GET and refer to constructor with self
        axios.get('http://localhost:3000/api/yelpreq', 
            {params: {
                search: value
            }})
        .then((response) => {
            const newRestaurants = Array.from(response.data);
            console.log(newRestaurants);
            self.setState({restaurants : newRestaurants});
    });
}

    render(){
        return(
            <div className="IndexApp">
                <SearchApp handleSearch={this.handleSearch} />
                <YelpResults restaurants={this.state.restaurants} />
                </div>
        )
    }
}

export default IndexApp;
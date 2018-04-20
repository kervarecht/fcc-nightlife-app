import React, {Component} from 'react';
import YelpResults from './YelpResults';
import SearchApp from './SearchApp';

const exampleFetchOne = {
    name: "Great Restaurant",
    location : {
        address1: "115 Charming Street"
    },
    image_url: "https://i.imgur.com/pHIgVhh.jpg",
    zip_code: "06067",
    going: 'No'
}

const exampleFetchTwo = {
    name: "Bob's Restaurant",
    location : {
        address1: "1145 DeBwan Street" 
    },
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

    handleSearch(value){
        //pass this into SearchApp so it can grab the searched location with which to generate YelpResults
        this.setState({"search": value}, () => {
            console.log(this.state.search);
        });
        axios.get('http://localhost:3000/api/yelpreq', 
    {params: {
        search: value
    }})
    .then(response => {
        console.log(response.data);
        this.setState({restaurants : response.data});
    })
    .catch(error => console.log(error))
    
        //add a fetch option here to make an API call
    }

    render(){
        return(
            <div className="IndexApp">
                <SearchApp handleSearch={this.handleSearch} />
                <YelpResults restaurants={this.state.restaurants}/>
                </div>
        )
    }
}

export default IndexApp;
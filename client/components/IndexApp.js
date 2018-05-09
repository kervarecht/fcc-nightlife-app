import React, {Component} from 'react';
import YelpResults from './YelpResults';
import SearchApp from './SearchApp';

class IndexApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: "",
            restaurants: [],
            prevSearch: ""
        }
        this.handleSearch = this.handleSearch.bind(this);   
    }
    componentDidMount(){
        axios.get('http://localhost:3000/searched')
        .then(response => {
            console.log(response.data);
            if (response.data){
                this.handleSearch(response.data);
            }
        });
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
                <YelpResults restaurants={this.state.restaurants}/>
                </div>
        )
    }
}

export default IndexApp;
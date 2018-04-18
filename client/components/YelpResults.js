import React, {Component} from 'react';
import YelpSingleResult from "./YelpSingleResult";

const exampleFetchOne = {
    name: "Great Restaurant",
    address: "115 Charming Street",
    img: "https://i.imgur.com/pHIgVhh.jpg",
    going: 'No'
}

const exampleFetchTwo = {
    name: "Bob's Restaurant",
    address: "1145 DeBwan Street",
    img: "https://i.imgur.com/EyY6ivm.jpg",
    going: 'No'
}

class YelpResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurants: [exampleFetchOne, exampleFetchTwo]
        }
        this.renderAll = this.renderAll.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){

    }

    renderAll(){
        console.log("renderAll called.")
        return this.state.restaurants.map(restaurant => {
            return (
            <YelpSingleResult
                name={restaurant.name}
                img={restaurant.img}
                address={restaurant.address}
                going={restaurant.going}
            />
            )
        });
    }

    render(){
        return(
            <div className="YelpResults">
                {this.renderAll()}
                </div>
        )
    }
}

export default YelpResults;
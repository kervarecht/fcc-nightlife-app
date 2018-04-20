import React, {Component} from 'react';
import YelpSingleResult from "./YelpSingleResult";

class YelpResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurants: this.props.restaurants
        }
        this.renderAll = this.renderAll.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){

    }

    renderAll(){
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
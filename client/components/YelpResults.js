import React, {Component} from 'react';
import YelpSingleResult from "./YelpSingleResult";



class YelpResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurants: this.props.restaurants
        }
        this.renderAll = this.renderAll.bind(this);
    }

    renderAll(){
        return this.state.restaurants.map(restaurant => {
            return (
            <YelpSingleResult
                name={restaurant.name}
                image_url={restaurant.image_url}
                address={restaurant.location.address1}
                zip_code={restaurant.location.zip_code}
                rating={restaurant.rating}
                going="No"
            />
            )
        });
    }

    componentWillReceiveProps(newProps){
        console.log(newProps);
        this.setState(newProps);
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
import React, {Component} from 'react';

class YelpSingleResult extends Component {
    constructor(props){
        super(props);
        }



    render(){
        return (
            <div className="YelpSingleResult" >
                <div className="img-container"><img src={this.props.image_url} /></div>
                <h4 className="restaurant-name">{this.props.name}</h4>
                <h5 className="restaurant-address">{this.props.address}</h5>
                <h5 className="zip-code">{this.props.zip_code}</h5>
                <h5 className="restaurant-is-going">{this.props.going}</h5>
                <h5 className="restaurant-rating">{this.props.rating}</h5>
            </div>
        )
    }
}

export default YelpSingleResult;
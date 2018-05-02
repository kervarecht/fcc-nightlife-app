import React, {Component} from 'react';

class YelpSingleResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            'going': this.props.going,
            'id': this.props.id
        }
        this.handleClick = this.handleClick.bind(this);
        }

    handleClick(){
        if (this.state.going == false){
            this.setState({'going': true});
            console.log("ID: " + this.state.id);
            this.props.addGoing(this.props.id);
        }
        else {
            this.setState({'going': false});
        }
    }

    render(){
        return (
            <div className={"YelpSingleResult going" + this.state.going} onClick={this.handleClick}>
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
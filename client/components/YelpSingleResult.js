import React, {Component} from 'react';


class YelpSingleResult extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        return this.props.handleClick(this.props.id);
    }
        
    render(){
        return (
            <div className={"YelpSingleResult going" + this.props.going} onClick={this.handleClick}>
                <div className="img-container"><img src={this.props.image_url} /></div>
                <h4 className="restaurant-name">{this.props.name}</h4>
                <h5 className="restaurant-address">{this.props.address}</h5>
                <h5 className="restaurant-is-going">{this.props.going}</h5>
                <h5 className={"restaurant-rating-" + this.props.rating}></h5>
                <input type="hidden" value={this.props.id} ></input>
            </div>
        )
    }
}

export default YelpSingleResult;
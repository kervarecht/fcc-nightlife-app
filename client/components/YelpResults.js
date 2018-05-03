import React, {Component} from 'react';
import YelpSingleResult from "./YelpSingleResult";



class YelpResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurants: this.props.restaurants,
            going: []
        }
        this.renderAll = this.renderAll.bind(this);
        this.addGoing = this.addGoing.bind(this);
    }

    componentDidMount(){

            axios.get('http://localhost:3000/user', {
                withCredentials: true
            })
            .then(response => {
                this.setState({going: response.data.user.going});
            });
    }

    addGoing(id){
        console.log(this.state.going);
        console.log("Parent function being called.");
        this.setState({going: [...this.state.going, id]});
        axios.get('http://localhost:3000/addgoing', {
            withCredentials: true,
            params: {
                going: id
            }
        }).then(response => {
            console.log(response);
        });
    }
    
    renderAll(){
        return this.state.restaurants.map(restaurant => {
            if (this.state.going.includes(restaurant.id)){
                return (
                    <YelpSingleResult 
                addGoing={this.addGoing}
                name={restaurant.name}
                image_url={restaurant.image_url}
                address={restaurant.location.address1}
                zip_code={restaurant.location.zip_code}
                rating={restaurant.rating}
                id={restaurant.id}
                going={true}
            />
                )
            }
            else {
            return (
            <YelpSingleResult 
                addGoing={this.addGoing}
                name={restaurant.name}
                image_url={restaurant.image_url}
                address={restaurant.location.address1}
                zip_code={restaurant.location.zip_code}
                rating={restaurant.rating}
                id={restaurant.id}
                going={false}
            />
            )
        }
        });
    }

    componentWillReceiveProps(newProps){
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
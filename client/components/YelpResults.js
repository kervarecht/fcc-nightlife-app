import React, {Component} from 'react';
import YelpSingleResult from "./YelpSingleResult";



class YelpResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurants: this.props.restaurants,
            going: [],
            loggedIn: false
        }
        this.renderAll = this.renderAll.bind(this);
        this.addGoing = this.addGoing.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.removeGoing = this.removeGoing.bind(this);
    }

    componentDidMount(){

            axios.get('http://localhost:3000/user', {
                withCredentials: true
            })
            .then(response => {
                if (!response.data.user.going || response.data.user.going == undefined){
                    console.log("Not logged in.");
                }
                else {
                this.setState({going: response.data.user.going,
                loggedIn: true});
                }
            });
    }

    addGoing(id){
        axios.get('http://localhost:3000/addgoing', {
            withCredentials: true,
            params: {
                going: id
            }
        }).then(response => {
            // console.log(response);
        }).catch(error => console.log(error));
    }
    removeGoing(id){
        axios.get('http://localhost:3000/removegoing', {
            withCredentials: true,
            params: {
                going: id
            }
        }).then(response => {
            // console.log(response);
        }).catch(error => console.log(error));
    }

    handleClick(id){
        if (this.state.loggedIn == false){
            alert("Please log in to use this feature");
        }
        else {
        if (!this.state.going.includes(id)){
            this.addGoing(id);
            this.setState({'going': [...this.state.going, id]})
        }
        else {
            const newState = Array.from(this.state.going).filter(value => value != id);
            this.removeGoing(id);
            this.setState({'going': newState});
        }}
    }
    renderAll(){
        return this.state.restaurants.map(restaurant => {
            if (this.state.going.includes(restaurant.id)){
                return (
                    <YelpSingleResult 
                handleClick={this.handleClick}
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
                handleClick={this.handleClick}
                removeGoing={this.removeGoing}
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
import React from 'react';
import Thing from './Thing';
import {ServerUrl} from './config';
import {forEach} from "react-bootstrap/es/utils/ElementChildren";

class ListOne extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            things: []
        };
    }


    async componentDidMount() {
        try {
            const response = await fetch("http://localhost:3001/");
            const things = await response.json();

            this.setState({
                isLoaded: true,
                things: things.things
            });

        } catch (error) {
            this.setState({
                isLoaded: true,
                error
            });
        }
    }


    async deleteThing(id) {
        const formData = new URLSearchParams();

        formData.append('id', id);

        try {
            const response = await fetch(ServerUrl + 'thing/delete', {
                credentials: 'include',
                method: 'POST',
                body: formData,
            });

            const myJson = await response.json();
            console.log(JSON.stringify(myJson));

            if (myJson.success) {
                this.setState({
                    things: this.state.things.filter(thing => thing.id !== id)
                });
            }

        } catch (e) {
            console.log(e);
        }

    }

    render() {
        const {error, isLoaded, things} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (things.length === 0) {
            return <div className="alert alert-primary" role="alert">No Items</div>
        } else {
            return (
                <ul id="allthings" className="list-group mt-3">
                    {things.map(thing => (
                        <Thing deleteThing={this.deleteThing.bind(this, thing.id)} key={thing.id} thing={thing}/>
                    ))}
                </ul>
            );
        }
    }
}

export default ListOne;



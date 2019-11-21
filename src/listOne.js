import React from 'react';
import Thing from './Thing';
import divWithClassName from "react-bootstrap/es/utils/divWithClassName";


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
                        <Thing thing={thing}/>
                    ))}
                </ul>
            );
        }
    }
}

export default ListOne;



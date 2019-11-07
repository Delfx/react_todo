import React from 'react';
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

    updateThing() {

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
                        <li key={thing.id} className="list-group-item">
                            <div className="groupForm">
                                <div className="d-inline">
                                    <span> {thing.thing} </span>
                                </div>

                                <form onSubmit={this.updateThing.bind(this, thing.id)} className="changeForm d-inline">
                                    <input type="submit" value="Change" name="change"
                                           className="btn btn-warning btn-sm ml-2"/>
                                </form>

                                <div className="container d-inline p-0">
                                    <button type="submit" className="btn btn-dark btn-sm ml-2 modalbutton"
                                            data-toggle="modal"
                                            data-target="#exampleModal<%= thing.id %>">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default ListOne;



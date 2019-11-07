import React from 'react';
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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.


    }

    render() {
        const {error, isLoaded, things} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul id="allthings" className="list-group mt-3">
                    {things.map(thing => (
                        <li key={thing.id} className="list-group-item">
                            <div className="groupForm">
                                <form className="d-inline">
                                    <span> {thing.thing} </span>
                                </form>

                                <form action="/thing/update" method="post" className="changeForm d-inline">
                                    <input type="submit" value="Change" name="change"
                                           className="btn btn-warning btn-sm ml-2"/>
                                    <input type="hidden" value="<%= thing.id %>" name="id" className="id"/>
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



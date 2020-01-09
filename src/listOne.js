import React from 'react';
import Thing from './Thing';
import {ServerUrl} from './config';
import AddThing from './AddThing';

class ListOne extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            things: []
        };

        this.addThing = this.addThing.bind(this);
    }

    addThing(thing) {
        const thingsCopy = this.state.things.slice();
        const user = sessionStorage.getItem('userId');
        const userId = Number.parseInt(user, 10);

        thingsCopy.push({thing: thing, userid: userId});
        this.setState({things: thingsCopy});
        console.log(this.state.things)
    }

    async fetchData() {
        let reqURL = ServerUrl;
        try {
            if ('hasUserThings' in this.props && this.props.hasUserThings) {
                reqURL = ServerUrl + 'user/things';
            }

            const response = await fetch(reqURL, {credentials: 'include'});
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

    async componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps.hasUserThings, prevState);

        if (prevProps.hasUserThings !== this.props.hasUserThings) {
            this.fetchData();
        }
    }

    async componentDidMount() {
        this.fetchData();
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
            return (
                <div>
                    <div className="alert alert-primary" role="alert">No Items</div>
                    <AddThing/>
                </div>
            );
        } else {
            return (
                <div>
                    <ul id="allthings" className="list-group mt-3">
                        {things.map(thing => (
                            <Thing deleteThing={this.deleteThing.bind(this, thing.id)} key={thing.id} thing={thing}/>
                        ))}
                    </ul>

                    <AddThing addThing={this.addThing}/>
                </div>


            );
        }
    }
}

export default ListOne;



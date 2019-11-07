import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ListOne from './listOne';
import Login from './login';
import {ServerUrl} from './config';

//TODO: react outer


class App extends React.Component {


    constructor(props) {
        super(props);
        this.getAboutUSer();
        this.state = {
            user: {
                isLogged: false
            }
        };
    }

    async getAboutUSer() {
        try {
            const response = await fetch(ServerUrl + 'user/about', {
                credentials: 'include',
                mode: 'cors'
            });
            const user = await response.json();
            this.setUser(user);
            console.log(user);
        } catch (e) {
            console.log(e);
        }

    }

    setUser(user) {
        this.setState({
            user
        });
    }


    logoutPost = async (event) => {
        // event.preventDefault();

        try {
            const response = await fetch(ServerUrl + 'user/logout', {
                credentials: 'include',
                method: 'POST',
            });

            const myJson = await response.json();
            console.log(myJson);
            this.setUser(myJson);

        } catch (e) {
            console.log(e);
        }

    };

    render() {
        console.log(this.state);
        const isLogged = this.state.user.isLogged;
        let link;


        if (isLogged) {
            link = <Link to="/" onClick={this.logoutPost} className="navbar-brand">Logout</Link>
        } else {
            link = <Link to="/login" className="navbar-brand">Login</Link>
        }
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
                        <Link to="/"><a className="navbar-brand" href="/">Things app</a></Link>
                        <Link to={"allthings"} className="container p-0">
                            <a className="navbar-brand" href="/">All Things</a>
                        </Link>
                        {link}
                    </nav>
                    <div className="container">
                        <Switch>
                            <Route path="/login">
                                <Login LoggedState={this.setUser.bind(this)}/>
                            </Route>
                            <Route path="/allthings">
                                <AllThings/>
                            </Route>
                            <Route path="/">
                                <ListOne/>
                            </Route>
                        </Switch>
                    </div>

                </div>
            </Router>
        );
    }
}


function AllThings() {
    return <h2>All Things</h2>
}

export default App;
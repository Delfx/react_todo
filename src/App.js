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
        const isLogged = this.state.user.isLogged;
        let link;
        let userThing;


        if (isLogged) {
            link = <Link to="/" onClick={this.logoutPost} className="navbar-brand">Logout</Link>;
            userThing = <Link to="/userThings" className="navbar-brand">User Things</Link>
        } else {
            link = <Link to="/login" className="navbar-brand">Login</Link>;
        }
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
                        <ul className="navbar-nav mr-auto">
                            <Link to="/" className="navbar-brand" >Things app</Link>
                            {userThing}
                        </ul>
                        <ul className="navbar-nav">
                            {link}
                        </ul>
                    </nav>
                    <div className="container">
                        <Switch>
                            <Route path="/login">
                                <Login LoggedState={this.setUser.bind(this)}/>
                            </Route>
                            <Route path="/userThings">
                               <ListOne hasUserThings={true}/>
                            </Route>
                            <Route path="/">
                                <ListOne />
                            </Route>
                        </Switch>
                    </div>

                </div>
            </Router>
        );
    }
}


export default App;
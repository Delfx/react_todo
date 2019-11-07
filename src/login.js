import React from 'react';
import {ServerUrl} from "./config";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }



     fetchLogin = async (event)  =>  {
        event.preventDefault();
        const formData = new URLSearchParams();

        formData.append('username', this.state.username);
        formData.append('password', this.state.password);

        try {
            const response = await fetch(ServerUrl + 'login', {
                credentials: 'include',
                method: 'POST',
                body: formData
            });

            const myJson = await response.json();
            console.log(myJson);
            this.props.LoggedState(myJson);

        } catch (e) {
            console.log(e);
        }

    };

    formHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    render() {
        return (
            <form onSubmit={this.fetchLogin}>
                <div className="form-group">
                    <label htmlFor="userName">Name</label>
                    <input type="text" name="username" onChange={this.formHandler} className="form-control" id="userName" placeholder="Enter name"
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" name="password" onChange={this.formHandler} className="form-control" id="inputPassword"
                           placeholder="Password" required/>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary"/>
                <a href="/registration" className="btn btn-danger">Add User</a>
            </form>
        );
    }


}


export default Login;

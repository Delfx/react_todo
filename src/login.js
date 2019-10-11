import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <form onSubmit={this.fetchLogin}>
                <div className="form-group">
                    <label htmlFor="userName">Name</label>
                    <input type="text" name="username" className="form-control" id="userName" placeholder="Enter name"
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" name="password" className="form-control" id="inputPassword"
                           placeholder="Password" required/>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary"/>
                <a href="/registration" className="btn btn-danger">Add User</a>
            </form>
        );
    }

    async fetchLogin(event) {
        event.preventDefault();
        console.log(event.target.value());
        const formData = new URLSearchParams();


        formData.append('username', 'lukas');
        formData.append('password', 'lukas');

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                body: formData
            });


            const myJson = await response.text();
            console.log(myJson);
        } catch (e) {
            console.log(e);
        }

    }
}


export default Login;

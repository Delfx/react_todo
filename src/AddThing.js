import React from 'react';
import {ServerUrl} from "./config";


class AddThing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleValue = this.handleValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValue(event) {
        this.setState({value: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const formData = new URLSearchParams();

        formData.append('thing', this.state.value);


        try {
            const response = await fetch(ServerUrl + 'thing/add', {
                credentials: 'include',
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            console.log(data);

            if (data.success) {
                this.props.addThing(this.state.value);
                this.setState({
                    value: ""
                });

            }


        } catch (e) {
            console.log(e);
        }

    }

    render() {
        return (
            <form className="mt-4" onSubmit={this.handleSubmit} >
                <div className="input-group">
                    <input className="form-control" value={this.state.value} onChange={this.handleValue}
                           id="inputGroupSelect04"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit">Add</button>
                    </div>
                </div>
            </form>
        );
    }
}


export default AddThing;
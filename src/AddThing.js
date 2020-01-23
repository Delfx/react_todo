import React from 'react';
import {ServerUrl} from "./config";


class AddThing extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            value: "",
            isPrivate: false
        };

        this.handleValue = this.handleValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePrivate = this.handlePrivate.bind(this);
    }

    handleValue(event) {
        this.setState({value: event.target.value});
    }

    handlePrivate(event) {
        this.setState({isPrivate: event.target.checked});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const formData = new URLSearchParams();

        formData.append('thing', this.state.value);
        formData.append('private', this.state.isPrivate ? '0' : '1');


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
            <form className="mt-4" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input className="form-control" value={this.state.value} onChange={this.handleValue}
                           id="inputGroupSelect04"/>
                </div>

                <div className="form-check">
                    <input type="checkbox" value="1" className="form-check-input" id="exampleCheck1"
                           onChange={this.handlePrivate} defaultChecked={this.state.isPrivate}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Private</label>
                </div>

                <button className="btn btn-outline-secondary" type="submit">Add</button>
            </form>
        );
    }
}


export default AddThing;
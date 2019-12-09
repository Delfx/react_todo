import React from 'react';
import ButtonsGroup from './ButtonsGroup'
import {ServerUrl} from './config';

class Thing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            thingNameUpdate: props.thing.thing,
            isEditable: false,
            thing: props.thing
        };


    }

    makeEditable(showButton) {
        if (this.state.isEditable) {
            showButton();
        }
        this.setState({isEditable: true});
    }

    cancelEditable(){
        this.setState({isEditable: false})
    }

    async submitChange(event) {
        event.preventDefault();
        const formData = new URLSearchParams();

        formData.append('changeThing', this.state.thingNameUpdate);
        formData.append('id', this.props.thing.id);


        try {
            const response = await fetch(ServerUrl + 'thing/update', {
                credentials: 'include',
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            console.log(data);

            if (data.success) {
                this.setState({
                    isEditable: false,
                    thing: Object.assign(this.state.thing, {thing: this.state.thingNameUpdate})
                });

            }


        } catch (e) {
            console.log(e);
        }

    }


    handleChange(event) {
        this.setState({thingNameUpdate: event.target.value});
    };

    render() {
        const thing = this.state.thing;
        let thingName = <span> {thing.thing} </span>;

        if (this.state.isEditable) {
            thingName =
                <form onSubmit={this.submitChange.bind(this)}>
                    <input type="text" name="FirstName" value={this.state.thingNameUpdate}
                           onChange={this.handleChange.bind(this)}/>
                    <button className="ml-1" type="submit">OK</button>
                    <button onClick={this.cancelEditable.bind(this)} className="ml-1" type="reset">Cancel</button>
                </form>;
        }

        return (
            <li className="list-group-item">
                <div className="groupForm">
                    <div className="d-inline">
                        {thingName}
                    </div>
                    <ButtonsGroup deleteThing={this.props.deleteThing} userId={thing.userid} isEditable={this.state.isEditable} makeEditable={this.makeEditable.bind(this)}/>
                </div>
            </li>
        );
    }
}

export default Thing;
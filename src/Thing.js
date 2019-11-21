import React from 'react';
import ButtonsGroup from './ButtonsGroup'


class Thing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditable: false
        }
    }

    makeEditable(){
        this.setState({ isEditable: true});
    }

    render() {
        const thing = this.props.thing;

        let thingName = <span> {thing.thing} </span>;

        if (this.state.isEditable) {
            thingName = <input type="text" name="FirstName" value={thing.thing}/>;
        }

        return (
            <li key={thing.id} className="list-group-item">
                <div className="groupForm">
                    <div className="d-inline">
                        {thingName}
                    </div>
                    <ButtonsGroup makeEditable={this.makeEditable.bind(this)}/>
                </div>
            </li>
        );
    }
}

export default Thing;
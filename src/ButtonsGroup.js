import React from 'react';
import Update from './Update'
import Delete from './Delete'

class ButtonsGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hide: false
        };
    }

    hideOnClick() {
        this.setState({hide: true});
        this.props.makeEditable();
    }


    render() {
        if (this.state.hide){
            return (
                <div className="d-none">
                    <Update />
                    <Delete />
                </div>
            )
        } else {
            return (
                <div className="d-inline">
                    <Update onClickProperty={this.hideOnClick.bind(this)}/>
                    <Delete />
                </div>
            )

        }

    }
}

export default ButtonsGroup;
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
        this.props.makeEditable(this.showButton.bind(this));
    }

    componentDidUpdate(prevProps) {
        if (this.props.isEditable !== prevProps.isEditable && !this.props.isEditable) {
            this.showButton();
        }
    }

    showButton() {
        this.setState({hide: false});
    }

    render() {
        const user = sessionStorage.getItem('userId');
        const userId = Number.parseInt(user, 10);



        if (!user || (user && this.props.userId !== userId)) {
            return null;
        }

        if (this.state.hide) {
            return (
                <div className="d-none">
                    <Update/>
                    <Delete/>
                </div>
            )
        } else {
            return (
                <div className="d-inline">
                    <Update onClickProperty={this.hideOnClick.bind(this)}/>
                    <Delete onClick={this.props.deleteThing}/>
                </div>
            )

        }

    }
}

export default ButtonsGroup;
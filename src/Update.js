import React from 'react';


class Update extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <input onClick={this.props.onClickProperty} type="submit" value="Change" name="change"
                   className="btn btn-warning btn-sm ml-2"/>
        )
    }
}

export default Update;
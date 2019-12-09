import React from 'react';


class Delete extends React.Component {


    render() {
        return (
            <button onClick={this.props.onClick} type="submit" className="btn btn-dark btn-sm ml-2">
                Delete
            </button>
        )
    }
}

export default Delete;
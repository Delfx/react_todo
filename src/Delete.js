import React from 'react';


class Delete extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="submit" className="btn btn-dark btn-sm ml-2">
                Delete
            </button>
        )
    }
}

export default Delete;
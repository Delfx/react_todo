import React from 'react';


class Thing extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li key={thing.id} className="list-group-item">
                <div className="groupForm">
                    <div className="d-inline">
                        <span> {thing.thing} </span>
                    </div>
                </div>
            </li>
        )
    }

}

export default Thing;
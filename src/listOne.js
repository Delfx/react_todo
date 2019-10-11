import React from 'react';


function listOne() {
    return (
        <ul id="allthings" className="list-group mt-3">
            <li className="list-group-item">
                <div className="groupForm">
                    <form className="d-inline">
                        <span> Test </span>
                    </form>

                    <form action="/thing/update" method="post" className="changeForm d-inline">
                        <input type="submit" value="Change" name="change" className="btn btn-warning btn-sm ml-2"/>
                        <input type="hidden" value="<%= thing.id %>" name="id" className="id"/>
                    </form>

                    <div className="container d-inline p-0">
                        <button type="submit" className="btn btn-dark btn-sm ml-2 modalbutton" data-toggle="modal"
                                data-target="#exampleModal<%= thing.id %>">
                            Delete
                        </button>

                    </div>

                </div>
            </li>
        </ul>
    );
}

export default listOne;



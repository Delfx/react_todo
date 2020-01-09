import React from 'react';


function navBar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
            <div className="container">
                <a class="navbar-brand" href="/">Things app</a>
                <a className="navbar-brand" href="/userThings">User Things</a>
                <a class="navbar-brand" href="/user/logout">Logout</a>
            </div>
        </nav>
    );
}

export default navBar;

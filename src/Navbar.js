import React from 'react';


function navBar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
            <div className="container">
                <a class="navbar-brand" href="/">Things app</a>
                <div class="container p-0">
                    <a class="navbar-brand" href="/">All Things</a>
                </div>
                <a class="navbar-brand" href="/user/logout">Logout</a>
            </div>
        </nav>
    );
}

export default navBar;

import React from 'react';
import {Link, withRouter} from 'react-router-dom';




function Navbar() {
    const {isAuthenticated, getIdTokenClaims, user, isLoading} = {
        isLoading: false,
        user: {name: 'theo', picture: 'https://tt.fr'},
        isAuthenticated: "rrr",
        getIdTokenClaims: "toto"
    }

    return (
        <header>
            <div className="container-fluid position-relative no-side-padding">
                <span className="logo">
                {user && user.picture && <img src={user.picture} alt="My Avatar"/>}
                    {!user && <img src='../static/images/240px-user-icon.png' alt="My Avatar"/>}
                </span>

                <div className="menu-nav-icon" data-nav-menu="#main-menu">
                    <i className="ion-navicon"/>
                </div>

                <ul className="main-menu visible-on-click" id="main-menu">
                    <li><Link className={"nav-link"} to={`/`}> Polyflix </Link></li>
                    <li>
                        <Link className={"nav-link"} to={"/"}>
                            {!isLoading && !user && (
                                <>
                                    <button className="btn btn-primary">Login</button>

                                </>
                            )}

                            {!isLoading && user && (
                                <>
                                    <div>
                                        <label className="mr-2">{user.name}</label>
                                        <Link to={`/logout`}>
                                            Sign Out
                                        </Link>
                                    </div>
                                </>
                            )}
                        </Link>
                    </li>
                    {isAuthenticated && (
                        <li><Link className={"nav-link"} to={"/create"}> Create </Link></li>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default withRouter(Navbar);

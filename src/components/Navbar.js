// Add app logo, handle logo click
// if have more time, make a userimg dropdown

import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';

function NavBar({setCurrentUser, currentUser}){
    const history = useHistory();

    function handleLogoClick(){
        history.push("/")
    }

    function handleLogOut(){
        localStorage.removeItem("token")
        setCurrentUser(null)
    }

    return(
        <div className="navbar-div">
            {/* logo */}
            <div className="narbar-right">
                {currentUser ? 
                <div>
                    <NavLink to="/" exact>Hoooome!</NavLink>
                    <NavLink to="/posts" exact>All posts!</NavLink>
                    <NavLink to="/" exact onClick={handleLogOut}>Logout</NavLink>
                    <NavLink to={`user/${currentUser.id}`} exact>Profile(userimg!)</NavLink>
                    {/* if possible add a dropdown to the profile img that contain logout and settings! */}
                </div>
                :
                <div>
                    <NavLink to="/auth" exact>Login/SignUp</NavLink>
                </div>
            }
            </div>
        </div>
    )
}

export default NavBar;
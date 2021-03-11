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
        <nav className="navbar-div">
            <div className="navbar-logo-div">
                <img className="navbar-logo" src={process.env.PUBLIC_URL + "/default_image/skyup_logo.png"} alt="skyup" onClick={handleLogoClick}/>
            </div>
            <div className="narbar-right">
                {currentUser ? 
                    <div className="narbar-right-icon-div">
                        <NavLink to="/" exact><i className="fas fa-home"></i></NavLink>
                        <NavLink to="/search" exact><i className="fas fa-search"></i></NavLink>
                        <NavLink to="/posts" exact><i className="fas fa-stream"></i></NavLink>
                        <NavLink to="/" exact onClick={handleLogOut}><i className="fas fa-sign-out-alt"></i></NavLink>
                        <NavLink to={`/user/${currentUser.id}`} 
                            exact>
                                {currentUser.image_url
                                    ? <img 
                                        src={currentUser.image_url}
                                        alt={currentUser.username}
                                    />
                                    : <img 
                                        src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
                                        alt={currentUser.username}
                                    />
                                }
                        </NavLink>
                        {/* if possible add a dropdown to the profile img that contain logout and settings! */}
                    </div>
                :
                <div className="narbar-right-icon-div">
                    <NavLink to="/auth" exact><i className="fas fa-sign-in-alt"></i>/<i className="fas fa-user-plus"></i></NavLink>
                </div>
            }
            </div>
        </nav>
    )
}

export default NavBar;
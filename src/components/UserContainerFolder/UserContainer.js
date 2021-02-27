// Need to add UserUpdateForm

import React from 'react';
import {Link} from 'react-router-dom';
import UserPostList from './UserPostList';

function UserContainer({currentUser, setCurrentUser}){
    return(
        <div className="user-container-div">
            <h1>Hello! UserContainer</h1>
            {/* currentUser img */}
            <h1>{currentUser.username}</h1>
            {/* follower, followee, honk! */}
            <Link to="/newpost">New Post Icon</Link>
            <UserPostList
                currentUser={currentUser}
                // setCurrentUser={setCurrentUser}
            />
            
            {/* UserUpdateForm */}
        </div>
    )

}
export default UserContainer;
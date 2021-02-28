// Need to add UserUpdateForm
// currentUser img
//follower, followee, honk

import React from 'react';
import {Link} from 'react-router-dom';
import UserPostList from './UserPostList';

function UserContainer({currentUser, setCurrentUser}){
    return(
        <div className="user-container-div">
            <h1>User Container</h1>
            {/* currentUser img */}
            <h1>{currentUser.username}</h1>
            {/* follower, followee, honk! */}
            <h3><Link to="/newpost">New Post Icon!!!</Link></h3>
            {currentUser.posts.length > 0 ?
                <UserPostList
                    currentUser={currentUser}
                />
            : "You Don't Have Any Post Yet!"}
            {/* UserUpdateForm */}
        </div>
    )
}
export default UserContainer;
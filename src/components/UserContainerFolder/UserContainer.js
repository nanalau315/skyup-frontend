// Need to add UserUpdateForm
// currentUser img
//follower, followee, honk

import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import UserPostList from './UserPostList';

function UserContainer({currentUser, setCurrentUser}){
    // console.log(currentUser)
    const {id} = useParams()
    const API = "http://localhost:3001/"

    const [user, setUser] = useState(currentUser)

    useEffect(()=>{
        fetch(`${API}users/${id}`)
            .then(r => r.json())
            .then(userObj=>{
                setUser(userObj)
            })
    }, [id])


    return(
        <div className="user-container-div">
            <h1>User Container</h1>
            {/* currentUser img */}
            <h1>{user.username}</h1>
            <h3><Link to={`/user/${id}/followers`}>Followers</Link></h3>
            <h3><Link to={`/user/${id}/following`}>Following</Link></h3>
            {/* honk! */}
            <h3><Link to="/newpost">New Post Icon!!!</Link></h3>
            {user.posts.length > 0 ?
                <UserPostList
                    currentUser={currentUser}
                    user={user}
                />
            : "You Don't Have Any Post Yet!"}
            {/* UserUpdateForm */}
        </div>
    )
}
export default UserContainer;
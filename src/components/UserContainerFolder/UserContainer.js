// Need to add UserUpdateForm
// currentUser img
//follower, followee, honk

import React from 'react';
// import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import UserPostList from './UserPostList';
// import {useParams} from 'react-router-dom';

function UserContainer({currentUser, setCurrentUser}){
    // console.log(currentUser)
    // const {id} = useParams()
    // const API = "http://localhost:3001/"

    // const [user, setUser] = useState(currentUser)
    // console.log(user)
    // useEffect(()=>{
    //     fetch(`${API}users/${id}`)
    //         .then(r => r.json())
    //         .then(userObj=>{
    //             setUser(userObj)
    //         })
    // }, [id, currentUser.id])


    return(
        <div className="user-container-div">
            <h1>User Container</h1>
            {/* currentUser img */}
            <h1>{currentUser.username}</h1>
            <h3><Link to="/user/followers">Followers</Link></h3>
            {/* <h3><Link to={`/user/${id}/followers`}>Followers</Link></h3> */}
            <h3><Link to="/user/following">Following</Link></h3>
            {/* <h3><Link to={`/user/${id}/following`}>Following</Link></h3> */}
            {/* honk! */}
            {currentUser
                ? <h3><Link to="/newpost">New Post Icon!!!</Link></h3>
                : null
            }
            
            {currentUser.posts.length > 0 ?
                <UserPostList
                    currentUser={currentUser}
                    // user={user}
                />
            : "You Don't Have Any Post Yet!"}
            {/* UserUpdateForm */}
        </div>
    )
}
export default UserContainer;
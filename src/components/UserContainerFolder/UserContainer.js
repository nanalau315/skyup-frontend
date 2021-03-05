// Need to add UserUpdateForm
// currentUser img => ADDED!!!
// follower, followee, honk => ADDED!!!
// HONK for USER

import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import UserPostList from './UserPostList';
// import UserUpdateForm from './UserUpdateForm'

function UserContainer({currentUser, setCurrentUser}){
    // console.log(currentUser)
    // followee = followed_users = who I am following
    // follower = following_users = who is following me
    const emptyUserHolder = {
        id: 0,
        image_url: "",
        username: "",
        posts: [],
        honks: [],
        comments: [],
        followed_users: [],
        followees: [],
        followers: [],
        following_users: []
    }

    const params = useParams()
    const API = "http://localhost:3001/"
    const [user, setUser] = useState(emptyUserHolder)
    const [errors, setErrors] = useState([]);
    
    useEffect(()=>{
        fetch(`${API}users/find/${params.id}`)
        .then(r => r.json())
        .then(userObj=>{
            setUser(userObj)
        })
    }, [params.id])
    
    const [updatedCurrentUser, setUpdatedCurrentUser] = useState(currentUser)
    // currentUserFollowedUsers is friendshipObjs: {id: 77, follower_id: 1, followee_id: 2}
    const [currentUserFollowedUsers, setCurrentUserFollowedUsers] = useState(currentUser.followed_users)
    // currentUserFollowees is followeesObjs: {id: 2, username: "test"}
    const [currentUserFollowees, setCurrentUserFollowees] = useState(currentUser.followees)
    // console.log(currentUserFollowees)
    
    // the following checks if currentUser followed the user already
    const userFollowees = currentUserFollowees.map((followee) => {
        return followee.id
    })
    const [isFollowed, setIsFollowed] = useState(userFollowees.includes(user.id))
    
    useEffect(()=>{
        fetch(`${API}users/find/${currentUser.id}`)
        .then(r => r.json())
        .then(userObj=>{
            setUpdatedCurrentUser(userObj)
            setCurrentUserFollowedUsers(userObj.followed_users)
            setCurrentUserFollowees(userObj.followees)
        })
    }, [currentUser.id])
    
    useEffect(() => {
        if (currentUserFollowees.map((followee) => {
            return followee.id
        }).includes(user.id)){
            // show "Unfollow"
            setIsFollowed(true)
        } else {
            // show "Follow"
            setIsFollowed(false)
        }
    },[currentUserFollowees, currentUserFollowedUsers, user.id])
    
    // console.log(currentUserFollowees)
    // console.log(userFollowees.includes(user.id))
    
    function handleFollow(userId){
        setIsFollowed((isFollowed) => !isFollowed)
        // console.log("in handleFollow")
        if (isFollowed === false){
            fetch(`${API}friendships`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    follower_id: updatedCurrentUser.id, 
                    followee_id: userId
                })
            })
            .then(r => r.json())
            .then((data) => {
                if (data.errors) {
                    // console.log("in handleFollow WITH error create path")
                    setErrors(data.errors);
                } else { 
                    // console.log(data)
                    // console.log("in handleFollow NO ERROR create path")
                    // data = friendship object = {id: 77, follower_id: 1, followee_id: 2}
                    const newCurrentUserFollowedUsers = [...currentUserFollowedUsers, data]
                    // console.log(newCurrentUserFollowedUsers)
                    setCurrentUserFollowedUsers(newCurrentUserFollowedUsers)
                    const newCurrentUserFollowee = {id: data.followee_id, username: user.username}
                    // console.log(newCurrentUserFollowee)
                    setCurrentUserFollowees([...currentUserFollowees, newCurrentUserFollowee])
                }
            });
        } else {
            // console.log("in handleFollow delete path")
            // first, find the friendshipObj from currentUserFollowedUsers array that needs to be destroy
            const userFolloweesFriendshipObj = currentUserFollowedUsers.find((followed_user) => {
                return followed_user.followee_id === userId
            })
            // console.log(userFolloweesFriendshipObj)
            fetch(`${API}friendships/${userFolloweesFriendshipObj.id}`, {
                method: "DELETE",
            })
                .then(removeFollowedUser(userFolloweesFriendshipObj.id))
        } 
    }

    // the (id) being passed down to the following function is the friendshipObj.id
    // currentUserFollowedUsers is friendshipObjs: {id: 77, follower_id: 1, followee_id: 2}
    // currentUserFollowees is followeesObjs: {id: 2, username: "test"}
    function removeFollowedUser(id){
        const newFollowedUsersArr = currentUserFollowedUsers.filter((friendshipObj) => {
            return friendshipObj.id !== id
        })
        const newCurrentUserFolloweesArr = currentUserFollowees.filter((followee) => {
            return followee.id !== user.id
        })
        setCurrentUserFollowedUsers(newFollowedUsersArr)
        setCurrentUserFollowees(newCurrentUserFolloweesArr)
        // console.log(currentUserFollowees)
    }
    // console.log(userFollowees.includes(user.id))
    return(
        <div className="user-container-div">
            <h1>User Container</h1>
            {errors.map((error) => {
                return <p key={error}>{error}</p>;
            })}
            {user.image_url
                ? <img 
                    src={user.image_url}
                    alt={user.username}
                    />
                : null
            }
            <h1>{user.username}</h1>
            {user.id !== currentUser.id
                ? (<button onClick={() => handleFollow(user.id)}>{isFollowed ? "Unfollow!" : "Follow!"}</button>)
                : null
            }
            <h3><Link to={`/user/${user.id}/followers`}>Followers</Link></h3>
            <h3><Link to={`/user/${user.id}/following`}>Following</Link></h3>
            <h3><Link to="/update">Update User Icon!!</Link></h3>
            {/* honk! */}
            {user.id === currentUser.id
                ? <h3><Link to="/newpost">New Post Icon!!!</Link></h3>
                : null
            }
            
            {user.posts.length > 0 
                ? <UserPostList
                    currentUser={updatedCurrentUser}
                    user={user}
                />
                : "You Don't Have Any Post Yet!"
            }
            {/* {user.id === currentUser.id
                ? <button onClick={()=>{setShowHidden(showHidden => !showHidden)}}>Update User Icon!!</button>
                : null} */}
            {/* {showHidden    
                ? <UserUpdateForm 
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    setShowHidden={setShowHidden}
                    />
                : null
            } */}
        </div>
    )
}

export default UserContainer;
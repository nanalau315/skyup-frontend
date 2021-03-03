// Need to add UserUpdateForm
// currentUser img
//follower, followee, honk

import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import UserPostList from './UserPostList';
import {useParams} from 'react-router-dom';

function UserContainer({currentUser, setCurrentUser}){
    // followee = followed_users = who I am following
    // follower = following_users = who is following me
    const params = useParams()
    const API = "http://localhost:3001/"
    const [user, setUser] = useState(currentUser)
    const [errors, setErrors] = useState([]);
    const [currentUserFollowedUsers, setCurrentUserFollowedUsers] = useState(currentUser.followed_users)
    
    // console.log(currentUser.followed_users)
    useEffect(()=>{
        fetch(`${API}users/find/${params.id}`)
        .then(r => r.json())
        .then(userObj=>{
            setUser(userObj)
        })
    }, [params.id])
    
    useEffect(() => {
        if (currentUser.followees.map((followee) => {
            return followee.id
        }).includes(user.id)){
            setIsFollowed(true)
        } else {
            setIsFollowed(false)
        }
    },[currentUser.followees, user.id])
    const userFollowees = currentUser.followees.map((followee) => {
        return followee.id
    })
    const [isFollowed, setIsFollowed] = useState(userFollowees.includes(user.id))

    // console.log(userFollowees.includes(user.id))
    // console.log(userFolloweesFriendshipId.id)
    
    function handleFollow(userId){
        setIsFollowed((isFollowed) => !isFollowed)
        if (!isFollowed){
            fetch(`${API}friendships`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    follower_id: currentUser.id, 
                    followee_id: userId
                })
            })
            .then(r => r.json())
            .then((data) => {
                if (data.errors) {
                    setErrors(data.errors);
                } else { 
                    setCurrentUserFollowedUsers((currentUserFollowedUsers) => [...currentUserFollowedUsers, data])
                }
            });
        } else {
            const userFolloweesFriendshipId = currentUserFollowedUsers.find((followed_user) => {
                return followed_user.followee_id === userId
            })
            // console.log(userFolloweesFriendshipId)
            fetch(`${API}friendships/${userFolloweesFriendshipId.id}`, {
                method: "DELETE",
            })
                .then(removeFollowedUser(userFolloweesFriendshipId.id))
        } 
    }
    
    function removeFollowedUser(id){
        const newFollowedUsersArr = currentUserFollowedUsers.filter((user) => {
            return user.id !== id
        })
        setCurrentUserFollowedUsers(newFollowedUsersArr)
    }
    // console.log(userFollowees.includes(user.id))
    return(
        <div className="user-container-div">
            <h1>User Container</h1>
            {errors.map((error) => {
                return <p key={error}>{error}</p>;
            })}
            {/* currentUser img */}
            <h1>{user.username}</h1>
            {user.id !== currentUser.id
                ? (<button onClick={() => handleFollow(user.id)}>{isFollowed ? "Unfollow!" : "Follow!"}</button>)
                : null
            }
            <h3><Link to={`/user/${user.id}/followers`}>Followers</Link></h3>
            <h3><Link to={`/user/${user.id}/following`}>Following</Link></h3>
            {/* honk! */}
            {user.id === currentUser.id
                ? <h3><Link to="/newpost">New Post Icon!!!</Link></h3>
                : null
            }
            
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
// : (userFolloweesFriendshipId.id)
// ? (<button onClick={() => handleUnfollow(userFolloweesFriendshipId.id)}>{isUnfollowed ? "Unfollowed!" : "Unfollow!"}</button>)
// : (<button onClick={() => handleFollow(user.id)}>{isFollowed ? "Followed!" : "Follow!"}</button>)

// function handleUnfollow(id){
//     fetch(`${API}friendships/${id}`, {
//         method: "DELETE",
//     })
//     setIsUnfollowed((isUnfollowed) => !isUnfollowed)
// }
// function handleFollow(userId){
//     fetch(`${API}friendships`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({follower_id: currentUser.id, followee_id: userId})
//     })
//         .then(r => r.json())
//         .then((data) => {
//             if (data.errors) {
//             setErrors(data.errors);
//             } else {
//             setIsFollowed((isFollowed) => !isFollowed)
//             }
//         });
// }
// function handleUnfollow(id){
//     fetch(`${API}friendships/${id}`, {
//         method: "DELETE",
//     })
//     setIsUnfollowed((isUnfollowed) => !isUnfollowed)
// }

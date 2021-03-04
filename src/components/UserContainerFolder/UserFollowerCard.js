// need to add follower's img
import React, {useState, useEffect} from 'react';

function UserFollowerCard({follower, removeFollower, currentUser, user}){
    // follower = friendship's id
    // follower.follower_id = (the person who are following you) 
    // follower.followee_id = (the one being followed, which is myself)
    const API = "http://localhost:3001/"
    const [username, setUsername] = useState('')

    useEffect(()=>{
        fetch(`${API}users/find/${follower.follower_id}`)
        .then(r => r.json())
        .then(userObj=>{
            setUsername(userObj.username)
        })
    }, [follower.follower_id])

    function handleRemoveFollower(id){
        fetch(`${API}friendships/${id}`, {
            method: "DELETE",
        })
        removeFollower(id)
    }

    return(
        <div>
            {/* follwer img!! */}
            <h4>{username}</h4>
            {user.id === currentUser.id 
                ? <button onClick={() => handleRemoveFollower(follower.id)}>Remove This Friend!</button>
                : null
            }
        </div>
    )
}
export default UserFollowerCard;
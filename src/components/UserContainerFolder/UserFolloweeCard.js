// need to add follower's img
import React, {useState, useEffect} from 'react';

function UserFolloweeCard({followee, removeFollowee, user, currentUser}){
    // followee = friendship's id
    // followee.follower_id = (the person who are following you) 
    // follower.followee_id = (the one being followed)
    const API = "http://localhost:3001/"
    const [username, setUsername] = useState('')

    useEffect(()=>{
        fetch(`${API}users/find/${followee.followee_id}`)
        .then(r => r.json())
        .then(userObj=>{
            setUsername(userObj.username)
        })
    }, [followee.followee_id])

    function handleRemoveFollowee(id){
        fetch(`${API}friendships/${id}`, {
            method: "DELETE",
        })
        removeFollowee(id)
    }

    return(
        <div>
            <h3>User Followee Card</h3>
            {/* follwee img!! */}
            <h4>{username}</h4>
            {user.id === currentUser.id
                ? <button onClick={() => handleRemoveFollowee(followee.id)}>Remove This Friend!</button>
                : null
            }
        </div>
    )
}
export default UserFolloweeCard;
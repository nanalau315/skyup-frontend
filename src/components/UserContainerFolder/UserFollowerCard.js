// need to add follower's img
import React from 'react';

function UserFollowerCard({follower, removeFollower}){
    const API = "http://localhost:3001/"

    function handleRemoveFollower(id){
        fetch(`${API}friendships/${id}`, {
            method: "DELETE",
        })
        removeFollower(id)
    }

    return(
        <div>
            <h3>User Follower Card</h3>
            {/* follwer img!! */}
            <h4>{follower.username}</h4>
            <button onClick={() => handleRemoveFollower(follower.id)}>Remove This Friend!</button>
        </div>

    )

}
export default UserFollowerCard;
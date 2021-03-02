// need to add follower's img
import React from 'react';

function UserFolloweeCard({followee, removeFollowee}){
    const API = "http://localhost:3001/"

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
            <h4>{followee.username}</h4>
            <button onClick={() => handleRemoveFollowee(followee.id)}>Remove This Friend!</button>
        </div>
    )
}
export default UserFolloweeCard;
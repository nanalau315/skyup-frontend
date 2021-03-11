// need to add follower's img
import React, {useState, useEffect} from 'react';

function UserFolloweeCard({followee, removeFollowee, user, currentUser}){
    // followee = friendship's id
    // followee.follower_id = (the person who are following you) 
    // follower.followee_id = (the one being followed)
    const API = "http://localhost:3001/"
    const [followeeUser, setFolloweeUser] = useState('')

    useEffect(()=>{
        fetch(`${API}users/find/${followee.followee_id}`)
        .then(r => r.json())
        .then(userObj=>{
            setFolloweeUser(userObj)
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
            <div className="search-card-div">
            <div className="search-card-user-image-div">
                {followeeUser.image_url
                    ? <img 
                        src={followeeUser.image_url}
                        alt={followeeUser.username}
                    />
                    : <img 
                        src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
                        alt={followeeUser.username}
                    />
                }
            </div>
            <div className="search-card-username">{followeeUser.username}</div>
            {user.id === currentUser.id 
                ? <span 
                onClick={() => handleRemoveFollowee(followee.id)}>
                    <i class="fas fa-user-slash"></i>
                </span>
                : null
            }
        </div>
        </div>
    )
}
export default UserFolloweeCard;
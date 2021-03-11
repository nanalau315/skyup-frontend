// need to add follower's img
import React, {useState, useEffect} from 'react';

function UserFollowerCard({follower, removeFollower, currentUser, user}){
    // follower = friendship's id
    // follower.follower_id = (the person who are following you) 
    // follower.followee_id = (the one being followed, which is myself)
    const API = "http://localhost:3001/"
    const [followerUser, setFollowerUser] = useState('')

    useEffect(()=>{
        fetch(`${API}users/find/${follower.follower_id}`)
        .then(r => r.json())
        .then(userObj=>{
            setFollowerUser(userObj)
        })
    }, [follower.follower_id])

    function handleRemoveFollower(id){
        fetch(`${API}friendships/${id}`, {
            method: "DELETE",
        })
        removeFollower(id)
    }
    // console.log(followerUser)

    return(
        <div className="search-card-div">
            <div className="search-card-user-image-div">
                {followerUser.image_url
                    ? <img 
                        src={followerUser.image_url}
                        alt={followerUser.username}
                    />
                    : <img 
                        src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
                        alt={followerUser.username}
                    />
                }
            </div>
            <div className="search-card-username">{followerUser.username}</div>
            {user.id === currentUser.id 
                ? <span 
                onClick={() => handleRemoveFollower(follower.id)}>
                    <i class="fas fa-user-slash"></i>
                </span>
                : null
            }
        </div>
    )
}
export default UserFollowerCard;
import React, {useState} from 'react';
import UserFollowerCard from "./UserFollowerCard"

function UserFollowersList({currentUser}){
    // console.log(currentUser.followers)
    const [followersArr, setFollowersArr] = useState(currentUser.followers)
    const followers = currentUser.followers.map((follower) =>{
        return (
            <UserFollowerCard
                key={follower.id}
                follower={follower}
                removeFollower={removeFollower}
            />
        )
    })

    function removeFollower(id){
        const newFollowersArr = followersArr.filter((follower) => {
            return follower.id !== id
        })
        setFollowersArr(newFollowersArr)
    }

    return(
        <div className="userfollowerslist-div">
            <h3>User Followers List</h3>
            {followers.length > 0
                ? followers
                : "You don't have any followers yet!"
            }
        </div>
    )
}
export default UserFollowersList;

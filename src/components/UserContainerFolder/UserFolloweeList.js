import React, {useState} from 'react';
import UserFolloweeCard from "./UserFolloweeCard"

function UserFolloweeList({currentUser}){
    // console.log(currentUser.followees)
    const [followeesArr, setFolloweesArr] = useState(currentUser.followees)
    
    const followees = followeesArr.map((followee) =>{
        return (
            <UserFolloweeCard
                key={followee.id}
                followee={followee}
                removeFollowee={removeFollowee}
            />
        )
    })
    // console.log(followeesArr.length)

    function removeFollowee(id){
        const newFolloweesArr = followeesArr.filter((followee) => {
            return followee.id !== id
        })
        setFolloweesArr(newFolloweesArr)
    }

    return(
        <div className="userfollowinglist-div">
            <h3>User Followees List</h3>
            {followees.length > 0
                ? followees
                : "You havent followed anyone yet!"
            }
        </div>
    )
}
export default UserFolloweeList;
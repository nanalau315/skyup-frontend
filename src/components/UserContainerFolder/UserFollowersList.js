import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import UserFollowerCard from "./UserFollowerCard"

function UserFollowersList({currentUser}){
    const params = useParams()
    const [followersArr, setFollowersArr] = useState(currentUser.following_users)
    const [user, setUser] = useState({})
    const API = "http://localhost:3001/"

    useEffect(()=>{
        fetch(`${API}users/find/${params.id}`)
        .then(r => r.json())
        .then(userObj=>{
            setFollowersArr(userObj.following_users)
            setUser(userObj)
        })
    }, [params.id])

    
    const userFollowers = followersArr.map((follower) =>{
        return (
            <UserFollowerCard
                key={follower.id}
                follower={follower}
                user={user}
                currentUser={currentUser}
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
        <div className="user-followers-list-div">
            <h3>User Followers List</h3>
            {followersArr.length > 0
                ? userFollowers
                : "You don't have any followers yet!"
            }
        </div>
    )
}
export default UserFollowersList;

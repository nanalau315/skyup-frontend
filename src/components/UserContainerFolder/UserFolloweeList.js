import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import UserFolloweeCard from "./UserFolloweeCard"

function UserFolloweeList({currentUser}){
    const emptyFriendshipHolder = [
        {   
            id: 0,
            follower_id: 0,
            followee_id: 0
        }
    ]

    const params = useParams()
    const [followeesArr, setFolloweesArr] = useState(emptyFriendshipHolder)
    const [user, setUser] = useState({})
    const API = "http://localhost:3001/"

    useEffect(()=>{
        fetch(`${API}users/find/${params.id}`)
        .then(r => r.json())
        .then(userObj=>{
            setFolloweesArr(userObj.followed_users)
            setUser(userObj)
        })
    }, [params.id])

    const userFollowees = followeesArr.map((followee) => {
        if (followee.id === 0){
            return null
        } else {
            return (
                <UserFolloweeCard
                    key={followee.id}
                    user={user}
                    currentUser={currentUser}
                    followee={followee}
                    removeFollowee={removeFollowee}
                />
            )
        }
    })

    function removeFollowee(id){
        const newFolloweesArr = followeesArr.filter((followee) => {
            return followee.id !== id
        })
        setFolloweesArr(newFolloweesArr)
    }

    return(
        <div className="user-following-list-div">
            <h2>User Following List</h2>
            {userFollowees.length > 0
                ? userFollowees
                : "You haven't followed anyone yet!"
            }
        </div>
    )
}
export default UserFolloweeList;
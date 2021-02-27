import React, {useState, useEffect} from 'react';
import UserPostCard from './UserPostCard';

function UserPostList({currentUser}){
    const API = "http://localhost:3001/"
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        fetch(`${API}posts`)
        .then(r => r.json())
        .then(postsObjs => {
            const currentUserPosts = postsObjs.filter((post) => {
                return post.user_id === currentUser.id
            }).reverse()
            setUserPosts(currentUserPosts)
            // console.log(currentUserPosts)
        })
    }, [currentUser.id])

    const userPostsArr = userPosts.map((post) => {
        return(
            <UserPostCard 
                key={post.id} 
                post={post}
                currentUser={currentUser}
            />
        )
    })

    return(
        <div className="userpostlist-div">
            <h1>User Post List</h1>
            {userPostsArr}
        </div>
    )
}
export default UserPostList;

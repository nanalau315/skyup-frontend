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
            })
    }, [currentUser.id])
    
    function deletePost(id){
        const newUserPostsArr = userPosts.filter((post) => {
            return post.id !== id
        })
        setUserPosts(newUserPostsArr)
    }

    const userPostsArr = userPosts.map((post) => {
        return(
            <UserPostCard 
                key={post.id} 
                post={post}
                currentUser={currentUser}
                deletePost={deletePost}
            />
        )
    })

    return(
        <div className="userpostlist-div">
            <h3>User Post List</h3>
            {userPostsArr}
        </div>
    )
}

export default UserPostList;
import React, {useState, useEffect} from 'react';
import PostCard from "./PostCard";

function PostList({currentUser}){
    const API = "http://localhost:3001/"
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`${API}posts`)
            .then(r => r.json())
            .then(postArr => {
                setPosts(postArr)
            })
    },[])

    function deletePost(id){
        const newPostsArr = posts.filter((post) => {
            return post.id !== id
        })
        setPosts(newPostsArr)
    }

    const postArr = posts.map((post) => {
        return (
            <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
                deletePost={deletePost}
            />
        )
    })

    return(
        <div className="post-list-div">
            <h3>Post List</h3>
            {postArr.length > 0
                ? postArr
                : null
            }
        </div>
    )
}

export default PostList;
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

    const postArr = posts.map((post) => {
        return (
            <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
            />
        )
    })

    return(
        <div>
            <h3>Post List</h3>
            {postArr}
        </div>
    )
}

export default PostList;
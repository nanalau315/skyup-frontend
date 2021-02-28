import React from 'react';
import PostList from './PostList';

function PostContainer({currentUser}){
    return(
        <div className="postcontainer-div">
            <h1>PostContainer</h1>
            <PostList currentUser={currentUser}/>
        </div>
    )
}
export default PostContainer;
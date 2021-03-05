import React from 'react';
import {Link} from 'react-router-dom';
import PostList from './PostList';

function PostContainer({currentUser}){
    return(
        <div className="post-container-div">
            <h1>PostContainer</h1>
            <h3><Link to="/newpost">New Post Icon!!!</Link></h3>
            <PostList currentUser={currentUser}/>
        </div>
    )
}
export default PostContainer;
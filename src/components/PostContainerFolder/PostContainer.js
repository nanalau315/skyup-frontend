import React from 'react';
import {Link} from 'react-router-dom';
import PostList from './PostList';

function PostContainer({currentUser}){
    return(
        <div className="post-container-div">
            <Link to="/newpost"><i class="fas fa-edit"></i></Link>
            <PostList 
                currentUser={currentUser}
            />
        </div>
    )
}
export default PostContainer;
import React from 'react';
import PostCommentList from './PostCommentList'

function PostCard({post, currentUser}){

    return(
        <div>
            <h3>Post Card {post.id}</h3>
            {/* author's Img */}
            <h4>{post.author}</h4>
            <h4>{post.honks.length}</h4>
            <h4>{post.content}</h4>
            <PostCommentList
                postId={post.id}
                comments={post.comments}
                currentUser={currentUser}
            />

        </div>
    )
}
export default PostCard;
//Need to add Post Img!

import React, {useState} from 'react';
import PostCommentList from './PostCommentList'
import PostEditForm from './PostEditForm';

function PostCard({post, currentUser, deletePost}){
    const [postCard, setPostCard] = useState(post)
    const [showEditPostForm, setShowEditPostForm] = useState(false)

    function editPost(updatedPost){
        setPostCard(updatedPost)
    }

    return(
        <div>
            <h3>Post Card {postCard.id}</h3>
            {/* author's Img */}
            <h4>{postCard.author}</h4>
            {/* Post Img!! */}
            <h4>{postCard.honks.length}</h4>
            <h4>{postCard.content}</h4>
            <PostCommentList
                postId={postCard.id}
                comments={postCard.comments}
                currentUser={currentUser}
            />
            {postCard.user_id === currentUser.id ?
                <button onClick={()=> setShowEditPostForm(showEditPostForm => !showEditPostForm)}>Edit Post Icon</button>
                : null}
                {showEditPostForm ?
                    <div>
                        <PostEditForm 
                            post={postCard} 
                            editPost={editPost}
                            currentUser={currentUser}
                            deletePost={deletePost}
                        />
                    </div> 
                : null
                }

        </div>
    )
}
export default PostCard;
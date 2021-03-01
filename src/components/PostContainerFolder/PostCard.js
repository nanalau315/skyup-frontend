//Need to add Post Img!

import React, {useState} from 'react';
import PostCommentList from './PostCommentList'
import PostEditForm from './PostEditForm';

function PostCard({post, currentUser, deletePost}){
    const API = "http://localhost:3001/"
    const [postCard, setPostCard] = useState(post)
    const [showEditPostForm, setShowEditPostForm] = useState(false)
    const [postHonks, setPostHonks] = useState(postCard.honks.length)

    const currentUserTotalHonks = postCard.honks.filter((honk) => {
        return honk.user_id === currentUser.id
    }).length
    
    const [currentUserHonks, setCurrentUserHonks] = useState(currentUserTotalHonks)
    
    function editPost(updatedPost){
        setPostCard(updatedPost)
    }

    function handleHonk(){
        fetch(`${API}honks`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user_id: currentUser.id, post_id: postCard.id})
        })
            .then(r => r.json())
            .then(setPostHonks((postHonks) => postHonks + 1))
            setCurrentUserHonks((currentUserHonks) => currentUserHonks + 1)
    }

    return(
        <div>
            <h3>Post Card {postCard.id}</h3>
            {/* author's Img */}
            <h4>{postCard.author}</h4>
            {/* Post Img!! */}
            <h3>PostImgHere!</h3>
            {currentUserHonks < 50 
                ? <button onClick={handleHonk}>Honk!</button>
                : "You've honk the maximum amount!"
            }
            <h4>{postHonks}</h4>
            <h4>{postCard.content}</h4>
            <h6>{postCard.created_time} ago</h6>
            <PostCommentList
                postId={postCard.id}
                comments={postCard.comments}
                currentUser={currentUser}
            />
            {postCard.user_id === currentUser.id 
                ? <button onClick={()=> setShowEditPostForm(showEditPostForm => !showEditPostForm)}>Edit Post Icon</button>
                : null
            }
                {showEditPostForm 
                    ? <div>
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
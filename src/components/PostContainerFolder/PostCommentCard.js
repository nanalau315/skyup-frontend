import React, {useState} from 'react';
import PostEditCommentForm from './PostEditCommentForm';

function PostCommentCard({comment, currentUser, updateComment, deleteComment}){
    const [showEditCommentForm, setShowEditCommentForm] = useState(false)
    
    return(
        <div>
            <h3>Post Comment Card</h3>
            <p>{comment.author} {comment.comment}</p>
            {comment.user_id === currentUser.id ? 
                <button onClick={()=> setShowEditCommentForm(showEditCommentForm => !showEditCommentForm)}>Edit Comment Icon</button> 
                : null
            }
            {showEditCommentForm ? 
                <div>
                    <PostEditCommentForm
                        comment={comment}
                        updateComment={updateComment}
                        deleteComment={deleteComment}
                    />
                </div>
            : null
            }

        </div>
    )

}
export default PostCommentCard;
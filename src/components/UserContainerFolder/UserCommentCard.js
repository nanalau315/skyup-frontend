import React,{useState} from 'react';
import UserEditCommentForm from './UserEditCommentForm';

function UserCommentCard({comment, currentUser, updateComment, deleteComment}){
    const [showEditCommentForm, setShowEditCommentForm] = useState(false)
    
    return(
        <div className="usercommentcard-div">
            <h3>User Comment Card #{comment.id}</h3>
            <p>{comment.author} {comment.comment}</p>
            {comment.user_id === currentUser.id ? 
                <button onClick={()=> setShowEditCommentForm(showEditCommentForm => !showEditCommentForm)}>Edit Comment Icon</button> 
                : null
            }
            {showEditCommentForm ? 
                <div>
                    <UserEditCommentForm
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
export default UserCommentCard;

// console.log(comment)
// console.log(comment.comment)
// console.log(comment.author)
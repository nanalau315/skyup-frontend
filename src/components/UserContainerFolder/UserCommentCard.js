import React,{useState} from 'react';
import UserEditCommentForm from './UserEditCommentForm';

function UserCommentCard({comment, currentUser, updateComment, deleteComment}){
    const [showEditCommentForm, setShowEditCommentForm] = useState(false)
    
    return(
        <div className="user-comment-card-div">
            <h3>User Comment Card #{comment.id}</h3>
            {comment.author_image_url
                ? <img 
                    src={comment.author_image_url}
                    alt={comment.author}
                />
                : <img 
                    src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
                    alt={comment.author}
                />
            }
            <p>{comment.author} {comment.comment}</p>
            <h6>{comment.created_time} ago</h6>
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
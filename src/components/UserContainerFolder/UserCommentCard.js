import React,{useState} from 'react';
import UserEditCommentForm from './UserEditCommentForm';

function UserCommentCard({comment, currentUser, updateComment, deleteComment}){
    const [showEditCommentForm, setShowEditCommentForm] = useState(false)
    
    return(
        <div className="post-comment-card-div">
            {/* <h3>User Comment Card #{comment.id}</h3> */}
            <div className="post-comment-card-comment-div">
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
                <h4>{comment.author}</h4>
                <div className="post-comment-card-comment"><p>{comment.comment}</p></div>
            </div>
            <div className="post-comment-card-edit-div">
                <p>{comment.created_time} ago</p>
                {comment.user_id === currentUser.id
                    ? <span 
                        onClick={()=> setShowEditCommentForm(showEditCommentForm => !showEditCommentForm)}>
                        <i class="far fa-edit"></i>
                    </span> 
                    : null
                }
            </div>
            {showEditCommentForm
                ? <div>
                    <UserEditCommentForm
                        comment={comment}
                        updateComment={updateComment}
                        deleteComment={deleteComment}
                        setShowEditCommentForm={setShowEditCommentForm}
                        showEditCommentForm={showEditCommentForm}
                    />
                </div>
                : null
            }
        </div>
    )
}
export default UserCommentCard;
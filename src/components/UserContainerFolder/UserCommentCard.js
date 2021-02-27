import React from 'react';
import UserEditCommentForm from './UserEditCommentForm';

function UserCommentCard({comment, currentUser, updateComment, deleteComment}){
    // console.log(comment)
    // console.log(comment.comment)
    // console.log(comment.author)
    return(
        <div className="usercommentcard-div">
            <h1>User Comment Card is hereee!</h1>
            <p>{comment.author} {comment.comment}</p>
            <UserEditCommentForm
                comment={comment}
                currentUser={currentUser}
                updateComment={updateComment}
                deleteComment={deleteComment}
            />
        </div>
    )
}
export default UserCommentCard;
import React from 'react';
import UserCommentCard from './UserCommentCard'

function UserCommentList({currentUser, comments, updateComment, deleteComment}){
    // console.log(comments)
    const commentsArr = comments.map((comment) => {
        return(
            <div>
                <UserCommentCard
                    key={comment.id}
                    comment={comment}
                    currentUser={currentUser}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                />
            </div>
        )
    })

    return(
        <div>
            <h1>Heyyy CommentList Here</h1>
            {commentsArr}
        </div>
    )
}

export default UserCommentList;
import React, {useState} from 'react';
import UserCommentCard from './UserCommentCard';
import UserNewCommentForm from './UserNewCommentForm';

function UserCommentList({currentUser, comments, postId}){
    const [userPostComments, setUserPostComments] = useState(comments)

    function addComment(commentObj){
        const newArr = [...userPostComments, commentObj]
        setUserPostComments(newArr)
    }
    
    function updateComment(updatedCommentObj){
        const newArr = userPostComments.map((comment) => {
            if (comment.id === updatedCommentObj.id){
                return updatedCommentObj
            } else {
                return comment
            }
        })
        setUserPostComments(newArr)
    }
    
    function deleteComment(id){
        const newArr = userPostComments.filter((comment) => {
            return comment.id !== id
        })
        setUserPostComments(newArr)
    }
    
    const commentCardArr = userPostComments.map((comment) => {
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
            <h3>Comment List</h3>
            {commentCardArr}
            <UserNewCommentForm
                currentUser={currentUser}
                postId={postId}
                addComment={addComment}
            />
        </div>
    )
}

export default UserCommentList;
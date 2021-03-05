import React, {useState} from 'react';
import PostCommentCard from './PostCommentCard';
import PostNewCommentForm from './PostNewCommentForm';

function PostCommentList({postId, comments, currentUser}){
    const [postComments, setPostComments] = useState(comments)

    function addComment(commentObj){
        const newArr = [...postComments, commentObj]
        setPostComments(newArr)
    }

    function updateComment(updatedCommentObj){
        const newArr = postComments.map((comment) => {
            if (comment.id === updatedCommentObj.id){
                return updatedCommentObj
            } else {
                return comment
            }
        })
        setPostComments(newArr)
    }
    
    function deleteComment(id){
        const newArr = postComments.filter((comment) => {
            return comment.id !== id
        })
        setPostComments(newArr)
    }

    const commentCard = postComments.map((comment) => {
        return (
            <PostCommentCard
                key={comment.id}
                comment={comment}
                currentUser={currentUser}
                updateComment={updateComment}
                deleteComment={deleteComment}
            />)
    })

    return (
        <div className="post-comment-list-div">
            <h3>Post Comment List</h3>
            {commentCard}
            <PostNewCommentForm
                currentUser={currentUser}
                postId={postId}
                addComment={addComment}
            />
        </div>
    )
}

export default PostCommentList;
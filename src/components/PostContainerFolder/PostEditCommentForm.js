import React, {useState} from 'react';

function PostEditCommentForm({comment, updateComment, deleteComment}){
    const API = "http://localhost:3001/"
    const [newComment, setNewComment] = useState(comment.comment)
    function handleSubmit(e){
        e.preventDefault()
        
        fetch(`${API}comments/${comment.id}`,{
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({comment: newComment})
        })
            .then(r => r.json())
            .then(updatedCommentObj=>{
                updateComment(updatedCommentObj)
            })
        setNewComment("")
    }

    function handleDelete(){
        fetch(`${API}comments/${comment.id}`,{
            method: "DELETE",
        })
        deleteComment(comment.id)
    }

    return(
        <div className="posteditcommentform-div">
            <h3>Post Edit Comment Form</h3>
            <form className="posteditcommentform" onSubmit={handleSubmit}>
                <input className="comment-input" type="text" name="comment" value={newComment} onChange={(e)=>setNewComment(e.target.value)} placeholder={comment.comment} required/>
                <button type="submit">Update Comment</button>
            </form>
                <button onClick={handleDelete}>Delete Comment</button>
        </div>
    )
}

export default PostEditCommentForm;
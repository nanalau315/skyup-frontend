import React, {useState} from 'react';

function PostEditCommentForm({comment, updateComment, deleteComment, setShowEditCommentForm, showEditCommentForm}){
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
        setShowEditCommentForm((showEditCommentForm) => !showEditCommentForm)
    }

    function handleDelete(){
        fetch(`${API}comments/${comment.id}`,{
            method: "DELETE",
        })
        deleteComment(comment.id)
    }

    return(
        <div className="post-edit-comment-form-div">
            {/* <h3>Post Edit Comment Form</h3> */}
            <div className="post-edit-comment-form">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="comment" 
                        value={newComment} 
                        onChange={(e)=>setNewComment(e.target.value)} 
                        placeholder={comment.comment} 
                        required
                    />
                    <button type="submit">
                        <i class="fas fa-check"></i>
                    </button>
                </form>
                <button onClick={handleDelete}>
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )
}

export default PostEditCommentForm;
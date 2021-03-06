import React, {useState} from 'react';

function PostNewCommentForm({currentUser, postId, addComment}){
    const API = "http://localhost:3001/"
    const [comment, setComment] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        const newComment = {
            user_id: currentUser.id,
            post_id: postId,
            comment,
        }
        
        fetch(`${API}comments`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newComment)
        })
            .then(r => r.json())
            .then(commentObj=>{
                addComment(commentObj)
            })
        
        setComment("")
    }

    return(
        <div className="post-new-comment-form-div">
            <h3>Post New Comment Form</h3>
            <form onSubmit={handleSubmit}>
                <input className="comment-input" type="text" name="comment" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder={"Leave a Comment as " +  currentUser.username} required/>
                    <button type="submit">Create Comment</button>
            </form>
        </div>
    )
}
export default PostNewCommentForm;
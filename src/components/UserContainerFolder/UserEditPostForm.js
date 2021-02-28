import React,{useState} from 'react';

function UserEditPostForm({currentUser, post, editPost, deletePost}){
    const API = "http://localhost:3001/"
    const [newContent, setNewContent] = useState(post.content)

    function handleSubmit(e){
        e.preventDefault()
        fetch(`${API}posts/${post.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({content: newContent})
        })
            .then(r => r.json())
            .then(updatedPost => {
                editPost(updatedPost)
            })
    }

    function handleDelete(){
        fetch(`${API}posts/${post.id}`, {
            method: "DELETE",
        })
        deletePost(post.id)
    }

    return(
        <div className="usereditpostform-div">
            <h3>User Edit Post Form</h3>
                <form onSubmit={handleSubmit}>
                    <input className="content-input" type="text" name="content" value={newContent} onChange={(e)=>setNewContent(e.target.value)} placeholder={"Edit Post Content as " +  currentUser.username} required/>
                    <button type="submit">Edit Post</button>
                </form>
            <button onClick={handleDelete}>Delete Post Icon!</button>
        </div>
    )
}
export default UserEditPostForm;
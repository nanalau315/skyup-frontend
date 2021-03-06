import React,{useState} from 'react';

function PostEditForm({currentUser, post, editPost, deletePost, showEditPostForm, setShowEditPostForm}){
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
                setShowEditPostForm((showEditPostForm) => !showEditPostForm)
            })
    }

    function handleDelete(){
        fetch(`${API}posts/${post.id}`, {
            method: "DELETE",
        })
        deletePost(post.id)
    }

    return(
        <div className="edit-post-form-div">
                <form onSubmit={handleSubmit}>
                    <input className="content-input" type="text" name="content" value={newContent} onChange={(e)=>setNewContent(e.target.value)} placeholder={"Edit Post Content as " +  currentUser.username} required/>
                    <button type="submit"><i class="far fa-edit"></i></button>
                </form>
            <button onClick={handleDelete}><i class="far fa-trash-alt"></i></button>
        </div>
    )
}
export default PostEditForm;
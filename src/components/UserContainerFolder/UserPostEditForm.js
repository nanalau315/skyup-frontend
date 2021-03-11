import React,{useState} from 'react';

function UserPostEditForm({currentUser, post, editPost, deletePost}){
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
        <div className="post-edit-comment-form-div">
            <div className="post-edit-comment-form">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="content" 
                        value={newContent} 
                        onChange={(e)=>setNewContent(e.target.value)} 
                        placeholder={"Edit Post Content as " +  currentUser.username} 
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
export default UserPostEditForm;
import React,{useState} from 'react';

function UserEditPostForm({currentUser, post, editPost}){
    const API = "http://localhost:3001/"
    const [newContent, setNewContent] = useState(post.content)
    // console.log(post)

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

    return(
        <div className="usereditpostform-div">
            <form onSubmit={handleSubmit}>
                <input className="content-input" type="text" name="content" value={newContent} onChange={(e)=>setNewContent(e.target.value)} placeholder={"Post Content as " +  currentUser.username} required/>
                <button type="submit">Edit Post</button>
            </form>
        </div>
    )
}
export default UserEditPostForm;
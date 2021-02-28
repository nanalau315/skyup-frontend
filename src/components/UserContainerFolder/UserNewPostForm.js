import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

function UserNewPostForm({currentUser}){
    const API = "http://localhost:3001/"
    const history = useHistory()
    const [content, setContent] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        fetch(`${API}posts`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user_id: currentUser.id, content: content})
        })
            .then(r => r.json())
            .then(newPostObj => {
                history.push(`/user`)
            })
    }

    return(
        <div className="usernewpostform-div">
            <form onSubmit={handleSubmit}>
                <input className="content-input" type="text" name="content" value={content} onChange={(e)=>setContent(e.target.value)} placeholder={"Post Content as " +  currentUser.username} required/>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default UserNewPostForm;
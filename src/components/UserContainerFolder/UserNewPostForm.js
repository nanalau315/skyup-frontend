import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

function UserNewPostForm({currentUser}){
    // console.log(currentUser.id)
    const API = "http://localhost:3001/"
    const history = useHistory()
    const [content, setContent] = useState("")
    const [postImage, setPostImage] = useState(null)
    // const [errors, setErrors] = useState([]);

    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append('user_id', currentUser.id);
        formData.append('content', content);
        formData.append('post_image', postImage);
        console.log(postImage)
        console.log(formData)

        fetch(`${API}posts`, {
            method: "POST",
            body: formData
        })
            .then(r => r.json())
            .then((data) => {
                // if(data.post_image.errors){
                //     setErrors(data.post_image.errors);
                // } else {
                    console.log(data)
                    history.goBack()
                // }
            })
                // newPostObj => {
                // console.log(newPostObj)
                // history.push("/posts")
    }
    

    return(
        <div className="user-new-post-form-div">
            <form onSubmit={handleSubmit}>
                <h1>Create A New Post</h1>
                <h4>Do not upload files bigger then 5mb</h4>
                <h4>or else it won't show up in your post!</h4>
                <h4>You have been warned! 😈</h4>
                <input
                    type="text" 
                    name="content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder={"Post Content as " + currentUser.username} required
                />
                <br/>
                <input 
                    type="file" 
                    name="postImage"
                    accept="image/png, image/jpeg, image/jpg" 
                    multiple={false} 
                    onChange={(e) => setPostImage(e.target.files[0] )} 
                />
                {/* {errors.map((error) => {
                return <p key={error}>{error}</p>;
                })} */}
                <br/>
                <button type="submit"><i class="fas fa-plus"></i></button>
            </form>
        </div>
    )
}

export default UserNewPostForm;
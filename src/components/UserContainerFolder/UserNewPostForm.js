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
                <input
                    type="text" 
                    name="content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder={"Post Content as " + currentUser.username} required
                />
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
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default UserNewPostForm;
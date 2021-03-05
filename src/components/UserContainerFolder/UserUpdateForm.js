import React, {useState} from 'react';
import {useHistory} from "react-router-dom"

function UserUpdateForm({currentUser, setCurrentUser}) {
    const [username, setUsername] = useState(currentUser.username)
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [userImage, setUserImage] = useState(null)
    const [errors, setErrors] = useState([])
    const history = useHistory();
    const API = "http://localhost:3001/"

    function handleUpdate(e) {
        e.preventDefault();  
        if (password !== confirmedPassword) {
            alert("Passwords need to match!")
            setPassword("")
            setConfirmedPassword("")
        } else {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('user_image', userImage);
            console.log(userImage)
            console.log(formData)

            const token = localStorage.getItem("token");
                if (token) {
                    fetch(`${API}users/${currentUser.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        method: "PATCH",
                        body: formData,
                    })
                    .then(r => r.json())
                    .then((data) => {
                        if (data.errors) {
                            setErrors(data.errors);
                        } else {
                            setCurrentUser(data);
                            console.log(data);
                            history.push(`/user/${data.id}`);
                        }
                    });
                }
        }
    }

    function handleDelete(){
      fetch(`${API}users/${currentUser.id}`, {
        method: "DELETE"
      })
      localStorage.removeItem("token")
      setCurrentUser(null)
      history.push("/")
    }
    
    return(
        <div className="user-update-form-div">
            <form className="user-update-form" onSubmit={handleUpdate} autoComplete="off">
              <h3>Update User Info</h3>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder={currentUser.username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    required
                />
                <label htmlFor="confirmed password">Re-Enter Password</label>
                <input 
                    type="password"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)} 
                    required
                />
                <label htmlFor="image">Choose an image</label>
                <input 
                    type="file" 
                    name="userImage"
                    accept="image/png, image/jpeg, image/jpg" 
                    multiple={false} 
                    onChange={(e) => setUserImage(e.target.files[0] )} 
                />
              <button type="submit">Update</button>
            </form>
              {errors.map((error, index)=>{return <p key={index} className="errors">{error}</p>})}
            <div className="delete-account">
              <h3>Delete Account</h3>
              <button onClick={handleDelete}>Delete User</button>
            </div>
        </div>
    )
}

export default UserUpdateForm;
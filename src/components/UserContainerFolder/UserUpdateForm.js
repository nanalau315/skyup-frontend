import React, {useState} from 'react';
import {useHistory} from "react-router-dom"
// import { confirmAlert } from 'react-confirm-alert';

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
        // confirmAlert({
        //     title: 'Confirm to submit',
        //     message: 'Are you sure to do this.',
        //     buttons: [
        //       {
        //         label: 'Yes',
        //         onClick: () => alert('Click Yes')
        //       },
        //       {
        //         label: 'No',
        //         onClick: () => alert('Click No')
        //       }
        //     ]
        //   });
        fetch(`${API}users/${currentUser.id}`, {
            method: "DELETE"
        })
        localStorage.removeItem("token")
        setCurrentUser(null)
        history.push("/")
    }
    
    return(
        <div className="user-new-post-form-div">
            <h1>User Settings</h1>
            <form className="user-update-form" onSubmit={handleUpdate} autoComplete="off">
                <label htmlFor="username">Username</label>
                <br/>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder={currentUser.username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    required
                />
                <br/>
                <label htmlFor="password">Password</label>
                <br/>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    required
                />
                <br/>
                <label htmlFor="confirmed password">Re-Enter Password</label>
                <br/>
                <input 
                    type="password"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)} 
                    required
                />
                <br/>
                <label htmlFor="image">Choose an image</label>
                <br/>
                <input 
                    type="file" 
                    name="userImage"
                    accept="image/png, image/jpeg, image/jpg" 
                    multiple={false} 
                    onChange={(e) => setUserImage(e.target.files[0] )} 
                />
                <br/>
              <button type="submit">Update</button>
            </form>
              {errors.map((error, index)=>{return <p key={index} className="errors">{error}</p>})}
            <div className="delete-account">
              <h1>Delete Account</h1>
              <p>ONCE YOU DELETE YOUR ACCOUNT, IT CAN'T BE REVERT!</p>
              <p>You have been warn!</p>
              <button onClick={handleDelete}><i class="far fa-trash-alt"></i> Delete User</button>
            </div>
        </div>
    )
}

export default UserUpdateForm;
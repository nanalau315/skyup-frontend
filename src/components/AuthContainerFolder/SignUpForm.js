import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUpForm({ setCurrentUser }) {
    const API = "http://localhost:3001/"
    // const [formData, setFormData] = useState({
    //     username: "",
    //     password: "",
    // });
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [userImage, setUserImage] = useState(null)
    const history = useHistory();

    // function handleChange(e) {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('user_image', userImage);
        console.log(userImage)
        console.log(formData)

        fetch(`${API}signup`, {
            method: "POST",
            body: formData,
        })
        .then(r => r.json())
        .then((data) => {
            if (data.errors) {
                setErrors(data.errors);
            } else {
                const { user, token } = data;
                localStorage.setItem("token", token);
                setCurrentUser(user)
                console.log(user);
                history.push(`/user/${user.id}`);
            }
        });
    }

    return (
        <div className="signup-form-div">
            <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
                <h1>Sign Up</h1>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="image">Choose an image</label>
                <input 
                    type="file" 
                    name="userImage"
                    accept="image/png, image/jpeg, image/jpg" 
                    multiple={false} 
                    onChange={(e) => setUserImage(e.target.files[0] )} 
                />
                {errors.map((error) => {
                return <p key={error}>{error}</p>;
                })}
                <button type="submit">Sign Up!</button> 
            </form>
        </div>
    );
}

export default SignUpForm;
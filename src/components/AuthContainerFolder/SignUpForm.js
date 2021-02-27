import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUpForm({ setCurrentUser }) {
    const API = "http://localhost:3001/"
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`${API}signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        })
        .then(r => r.json())
        .then((data) => {
            if (data.errors) {
            setErrors(data.errors);
            } else {
            const { user, token } = data;
            localStorage.setItem("token", token);
            setCurrentUser(user);
            history.push("/user");
            }
        });
    }

    return (
        <div className="signup-form-div">
            <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
                <h1>Sign Up</h1>
                <label>Username</label>
                <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                />
                <label>Password</label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                />
                {errors.map((error) => {
                return <p key={error}>{error}</p>;
                })}
                <input type="submit" value="Sign Up!" />
            </form>
        </div>
    );
}

export default SignUpForm;
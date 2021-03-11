import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginForm({ setCurrentUser }) {
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
        fetch(`${API}login`, {
            method: "POST",
            headers: {"Content-Type": "application/json",
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
            history.push(`/user/${user.id}`);
            }
        });
    }

    return (
        <div className="login-form-div">
            <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <h1>Login</h1>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <br/>
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
                <br/>
                <button type="submit" value="Login!">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
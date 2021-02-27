import React from 'react';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function AuthContainer({setCurrentUser}){

    return (
        <div className="auth-container-div">
            <h1>Hello! AuthContainer</h1>
            <LoginForm 
                setCurrentUser={setCurrentUser}
            />
            <SignUpForm 
                setCurrentUser={setCurrentUser}
            />
        </div>
    )
}

export default AuthContainer;
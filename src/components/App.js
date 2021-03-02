import React, {useState, useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./Navbar";
import Home from "./Home";
import AuthContainer from "./AuthContainerFolder/AuthContainer";
import PostContainer from "./PostContainerFolder/PostContainer";
import UserContainer from "./UserContainerFolder/UserContainer";
import UserNewPostForm from "./UserContainerFolder/UserNewPostForm";
import UserFollowersList from './UserContainerFolder/UserFollowersList';
import UserFollowingList from './UserContainerFolder/UserFolloweeList';

function App() {
  const API = "http://localhost:3001/"
  const [currentUser, setCurrentUser] = useState(null)

  // check if there's a token from the logged in user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API}users/:id`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(r => r.json())
      .then(setCurrentUser)
    }
  }, []);

  return (
    <div className="body-div">
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Switch>
        <Route path="/auth">
          <AuthContainer setCurrentUser={setCurrentUser}/>
        </Route>
        <Route path="/posts">
          {currentUser ? <PostContainer currentUser={currentUser}/> : "Uh-oh, you need to Login or Signup! 👀"}
        </Route>
        <Route exact path="/users">
          {currentUser ? <UserContainer currentUser={currentUser} setCurrentUser={setCurrentUser}/> : "Uh-oh, you need to Login or Signup! 👀"}
        </Route>
        <Route path="/user/followers">
          {currentUser ? <UserFollowersList currentUser={currentUser} /> : "Uh-oh, you need to Login or Signup! 👀"}
        </Route>
        <Route path="/user/following">
          {currentUser ? <UserFollowingList currentUser={currentUser} /> : "Uh-oh, you need to Login or Signup! 👀"}
        </Route>
        {/* <Route path="/user/:id">
          {currentUser ? <UserContainer currentUser={currentUser} setCurrentUser={setCurrentUser}/> : "Uh-oh, you need to Login or Signup! 👀"}
        </Route> */}
        <Route path="/newpost">
          {currentUser ? <UserNewPostForm currentUser={currentUser} /> : "Uh-oh, you need to Login or Signup! 👀"}
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        
      </Switch>
    </div>
  )
}

export default App;

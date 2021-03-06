import React, {useState, useEffect} from 'react';
import PostCard from "./PostCard";

function PostList({currentUser}){
    const API = "http://localhost:3001/"
    const [posts, setPosts] = useState([])
    const [updatedCurrentUser, setUpdatedCurrentUser] = useState(currentUser)
    // currentUserFollowees is followeesObjs: {id: 2, username: "test"}
    const [currentUserFollowees, setCurrentUserFollowees] = useState(currentUser.followees)
    const [filteredByFollowedUser, setFilteredByFollowedUser] = useState(false)

    useEffect(() => {
        fetch(`${API}posts`)
            .then(r => r.json())
            .then(postArr => {
                setPosts(postArr)
            })
    },[])

    // followee = followed_users = who I am following
    // follower = following_users = who is following me

    useEffect(()=>{
        const token = localStorage.getItem("token");
            if (token) {
                fetch(`${API}users/${updatedCurrentUser.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(r => r.json())
                .then(userObj=>{
                    setUpdatedCurrentUser(userObj)
                    setCurrentUserFollowees(userObj.followees)
                })
            }
    }, [updatedCurrentUser.id])
    
    function deletePost(id){
        const newPostsArr = posts.filter((post) => {
            return post.id !== id
        })
        setPosts(newPostsArr)
    }

    
    // posts => all the posts ever created global
    // currentUser.followers => give arrays of :{id: 2, username: "test", image_url: null}
    const currentUserFollowers = currentUserFollowees.map((followee) => {
        return followee.id
    })

    const currentUserFollowedUsersPostArr = posts.filter((post) => {
        if (currentUserFollowers.includes(post.user_id)){
            return post
        } else {
            return null
        }
    }).map((post) => {
        return (
            <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
            deletePost={deletePost}
            />
        )
    })
    
    const globalPostArr = posts.map((post) => {
        return (
            <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
            deletePost={deletePost}
            />
        )
    })
        
    return(
        <div className="post-list-div">
            <h3>Post List</h3>
            <button 
                onClick={() => setFilteredByFollowedUser((filteredByFollowedUser) => !filteredByFollowedUser)}>
                    {filteredByFollowedUser ? "see everyone" : "see my friends!"}
            </button>
            {!filteredByFollowedUser
                ? globalPostArr
                : (currentUserFollowedUsersPostArr.length < 1)
                ? "None of your friends have posted yet! Tell them to post something!"
                : currentUserFollowedUsersPostArr
            }
        </div>
    )
}

export default PostList;


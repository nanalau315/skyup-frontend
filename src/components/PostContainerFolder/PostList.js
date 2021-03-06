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
    }).reverse().map((post) => {
        return (
            <PostCard
            key={post.id}
            postId={post.id}
            currentUser={currentUser}
            deletePost={deletePost}
            />
        )
    })
    
    const globalPostArr = posts.reverse().map((post) => {
        return (
            <PostCard
            key={post.id}
            postId={post.id}
            currentUser={currentUser}
            deletePost={deletePost}
            />
        )
    })
        
    return(
        <div className="post-list-div">
            <span 
                onClick={() => setFilteredByFollowedUser((filteredByFollowedUser) => !filteredByFollowedUser)}>
                    {filteredByFollowedUser ? <i class="fas fa-globe"></i> : <i class="fas fa-users"></i>}
            </span>
            {!filteredByFollowedUser
                ? globalPostArr
                : (currentUserFollowedUsersPostArr.length < 1)
                ? <div className="no-friend-upload-div"><h1>None of your friends have posted yet!</h1> <h1>Tell them to post something!</h1></div>
                : currentUserFollowedUsersPostArr
            }
        </div>
    )
}

export default PostList;


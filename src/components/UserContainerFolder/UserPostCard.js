// need to add currentUser Img and Post img

import React, {useState} from 'react';
import UserCommentList from './UserCommentList';
import UserEditPostForm from './UserEditPostForm';

function UserPostCard({post, currentUser, deletePost}){
    const API = "http://localhost:3001/"
    const [userPost, setUserPost] = useState(post)
    const [showEditPostForm, setShowEditPostForm] = useState(false)
    const [userPostHonks, setUserPostHonks] = useState(userPost.honks.length)
    
    const currentUserTotalHonks = userPost.honks.filter((honk) => {
        return honk.user_id === currentUser.id
    }).length

    const [currentUserHonks, setCurrentUserHonks] = useState(currentUserTotalHonks)

    function editPost(updatedPost){
        setUserPost(updatedPost)
    }

    function handleHonk(){
        fetch(`${API}honks`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user_id: currentUser.id, post_id: userPost.id})
        })
        .then(r => r.json())
        .then(setUserPostHonks((userPostHonks) => userPostHonks + 1))
        setCurrentUserHonks((currentUserHonks) => currentUserHonks + 1)
    }
    
    return(
        <div className="userpostcard-div">
            <h1>User Post Card#{userPost.id}</h1>
            {/* currentUser's img! */}
            <h3>UserImgHere!</h3>
            <h4>{userPost.author}</h4>
            {/* post img! */}
            <h3>PostImgHere!</h3>
            {currentUserHonks < 50
                ? <button onClick={handleHonk}>Honk!</button>
                : "You've honk the maximum amount!"
            }
            <h4>{userPostHonks}</h4>
            <h4>{userPost.content}</h4>
            <h6>{userPost.created_time} ago</h6>
            <UserCommentList
                postId={userPost.id} 
                comments={userPost.comments}
                currentUser={currentUser}
                />
            {userPost.user_id === currentUser.id ?
                <button onClick={()=> setShowEditPostForm(showEditPostForm => !showEditPostForm)}>Edit Post Icon</button>
                : null}
                {showEditPostForm ?
                    <div>
                        <UserEditPostForm 
                            post={userPost} 
                            editPost={editPost}
                            currentUser={currentUser}
                            deletePost={deletePost}
                        />
                    </div> 
                : null
                }
        </div>
    )
}
export default UserPostCard;

// console.log(post.comments[0].comment)
// console.log(post.honks.length)
// console.log(post.content)
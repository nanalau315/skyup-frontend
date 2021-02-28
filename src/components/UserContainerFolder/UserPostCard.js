// need to add currentUser Img and Post img

import React, {useState} from 'react';
import UserCommentList from './UserCommentList';
import UserEditPostForm from './UserEditPostForm';

function UserPostCard({post, currentUser, deletePost}){
    const [userPost, setUserPost] = useState(post)
    const [showEditPostForm, setShowEditPostForm] = useState(false)

    function editPost(updatedPost){
        setUserPost(updatedPost)
    }
    
    return(
        <div className="userpostcard-div">
            <h1>User Post Card#{userPost.id}</h1>
            {/* currentUser's img! */}
            <h3>UserImgHere!</h3>
            <h4>{userPost.author}</h4>
            {/* post img! */}
            <h3>PostImgHere!</h3>
            <h4>{userPost.honks.length}</h4>
            <h4>{userPost.content}</h4>
            <UserCommentList
                postId={post.id} 
                comments={post.comments}
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
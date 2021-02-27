// need to add currentUser Img
import React, {useState} from 'react';
// import {Link} from 'react-router-dom';
import UserCommentList from './UserCommentList';
import UserNewCommentForm from './UserNewCommentForm';
import UserEditPostForm from './UserEditPostForm';

function UserPostCard({post, currentUser}){
    const [comments, setComments] = useState(post.comments)
    const [userPost, setUserPost] = useState(post)
    // console.log(post.comments[0].comment)
    // console.log(post.honks.length)
    // console.log(post.content)
    function editPost(updatedPost){
        setUserPost(updatedPost)
    }

    function addComment(commentObj){
        const newArr = [...comments, commentObj]
        setComments(newArr)
    }

    function updateComment(updatedCommentObj){
        const newArr = comments.map((comment) => {
            if (comment.id === updatedCommentObj.id){
                return updatedCommentObj
            } else {
                return comment
            }
        })
        setComments(newArr)
    }

    function deleteComment(id){
        const newArr = comments.filter((comment) => {
            return comment.id !== id
        })
        setComments(newArr)
    }

    return(
        <div className="userpostcard-div">
            <h1>User Post Card</h1>
            {/* currentUser's img! */}
            <h1>UserImgHere!</h1>
            <p>{currentUser.username}</p>
            {/* post img! */}
            <h1>PostImgHere!</h1>
            <p>{userPost.honks.length}</p>
            <p>{userPost.content}</p>
            <UserCommentList 
                comments={comments}
                currentUser={currentUser}
                updateComment={updateComment}
                deleteComment={deleteComment}
            />
            <UserNewCommentForm
                currentUser={currentUser}
                post={userPost}
                addComment={addComment}
            />

            <UserEditPostForm 
                post={userPost} 
                editPost={editPost}
                currentUser={currentUser}
            />

        </div>
    )
}
export default UserPostCard;
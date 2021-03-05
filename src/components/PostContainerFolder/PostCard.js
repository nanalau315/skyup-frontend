//Need to add Post Img! => ADDED!!!!!! WOOHOOO!!!

import React, {useState} from 'react';
import PostCommentList from './PostCommentList'
import PostEditForm from './PostEditForm';

function PostCard({post, currentUser, deletePost}){
    const API = "http://localhost:3001/"
    const [postCard, setPostCard] = useState(post)
    const [showEditPostForm, setShowEditPostForm] = useState(false)
    const [postHonks, setPostHonks] = useState(postCard.honks.length)
    
    const currentUserTotalHonks = postCard.honks.filter((honk) => {
        return honk.user_id === currentUser.id
    }).length
    
    const [currentUserHonks, setCurrentUserHonks] = useState(currentUserTotalHonks)
    
    function editPost(updatedPost){
        setPostCard(updatedPost)
    }
    
    function handleHonk(){
        fetch(`${API}honks`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user_id: currentUser.id, post_id: postCard.id})
        })
        .then(r => r.json())
        .then(setPostHonks((postHonks) => postHonks + 1))
        setCurrentUserHonks((currentUserHonks) => currentUserHonks + 1)
    }
    // console.log(postCard.image_url)
    // the url looks like this :  http://localhost:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--efc4772c387f6349f3eea1771c66812ace89046e/cute_cat.jpg
    return(
        <div className="post-card-div">
            <h1>Post Card {postCard.id}</h1>
            {postCard.user.image_url
                ? <img 
                    src={postCard.user.image_url}
                    alt={postCard.author}
                />
                : <img 
                    src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
                    alt={postCard.author}
                />
            }
            <h4>{postCard.author}</h4>
            {postCard.image_url
                ? <img 
                    src={postCard.image_url}
                    alt="cat"
                />
                : null
            }
            {currentUserHonks < 50 
                ? <button onClick={handleHonk}>Honk!</button>
                : "You've honk the maximum amount!"
            }
            <h4>{postHonks}</h4>
            <h4>{postCard.content}</h4>
            <h6>{postCard.created_time} ago</h6>
            <PostCommentList
                postId={postCard.id}
                comments={postCard.comments}
                currentUser={currentUser}
                />
            {postCard.user_id === currentUser.id 
                ? <button onClick={()=> setShowEditPostForm(showEditPostForm => !showEditPostForm)}>Edit Post Icon</button>
                : null
            }
                {showEditPostForm 
                    ? <div>
                        <PostEditForm 
                            post={postCard} 
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
export default PostCard;


// const emptyPostHolder ={
//     author: "",
//     comments:[],
//     content: "",
//     created_time: "",
//     honks: [],
//     id: 0,
//     image_url: "",
//     user: {},
//     user_id: 0
// }
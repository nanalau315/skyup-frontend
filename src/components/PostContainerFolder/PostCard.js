//Need to add Post Img! => ADDED!!!!!! WOOHOOO!!!

import React, {useState, useEffect} from 'react';
import PostCommentList from './PostCommentList'
import PostEditForm from './PostEditForm';
import PostReportList from './PostReportList'

function PostCard({postId, currentUser, deletePost}){

    const emptyPostHolder = {
       author: "",
       comments: [],
       content: "",
       created_time: "",
       honks: [],
       id: null,
       image_url: "",
       postreports: [],
       user: {},
       user_id: null
    }
    const API = "http://localhost:3001/"
    const [postCard, setPostCard] = useState(emptyPostHolder)
    const [postHonks, setPostHonks] = useState(postCard.honks.length)
    const [postComments, setPostComments] = useState(postCard.comments)
    const [showEditPostForm, setShowEditPostForm] = useState(false)
    const [showReportList, setShowReportList] = useState(false)
    const [postReportAmount, setPostReportAmount] = useState(postCard.postreports.length)
    
    useEffect(() => {
        fetch(`${API}posts/${postId}`)
            .then(r => r.json())
            .then(post => {
                setPostCard(post)
                setPostHonks(post.honks.length)
                setPostReportAmount(post.postreports.length)
                setPostComments(post.comments)
            })
    },[postId, postReportAmount])

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
            {postReportAmount < 5
                ? <div>
                    {/* <h1>Post Card {postCard.id}</h1> */}
                    <div className="post-card-author-header-div">
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
                    </div>
                    <div className="post-card-post-img-div">
                        {postCard.image_url
                            ? <img 
                                src={postCard.image_url}
                                alt={postCard.content}
                            />
                            : null
                        }
                    </div>
                    <div className="post-card-honk-div">
                        {currentUserHonks < 50 
                            ? <span onClick={handleHonk}><i class="fas fa-bullhorn">  {postHonks}!</i></span>
                            : "You've honk the maximum amount of 50 times!!"
                        }
                    </div>
                    {/* <h4>{postHonks} (Honk Icon Here)</h4> */}
                    <div className="post-card-post-content-div">
                        <h4>{postCard.content}</h4>
                        <p>{postCard.created_time} ago</p>
                    </div>
                    <PostCommentList
                        postId={postCard.id}
                        postComments={postComments}
                        setPostComments={setPostComments}
                        currentUser={currentUser}
                        />
                    <div className="post-card-edit-post-button-div">
                        {postCard.user_id === currentUser.id 
                            ? <button 
                                onClick={()=> setShowEditPostForm(showEditPostForm => !showEditPostForm)}>
                                <i class="far fa-edit"> Edit Post</i>
                            </button>
                            : null
                        }
                    </div>
                    {showEditPostForm 
                        ? <div>
                            <PostEditForm 
                                post={postCard} 
                                editPost={editPost}
                                currentUser={currentUser}
                                deletePost={deletePost}
                                showEditPostForm={showEditPostForm}
                                setShowEditPostForm={setShowEditPostForm}
                                />
                            </div> 
                        : null
                    }
                    <br/>
                    <div className="post-card-edit-post-button-div">
                        {postCard.user_id !== currentUser.id
                            ? <button 
                                onClick={() => setShowReportList((showReportList) => !showReportList)}>
                                    <div className="post-card-report-button-div"><i class="fas fa-ban"></i> <p>{postReportAmount}</p></div>
                            </button>
                            : null
                        }
                    </div>
                    {showReportList 
                        ? <PostReportList
                            postId={postCard.id}
                            reports={postCard.postreports}
                            currentUser={currentUser}
                            setPostReportAmount={setPostReportAmount}
                        />
                    : null
                    }
                    </div>
                : <div className="reported-post-div">This post has been reported by members of the community too many times so it has been hide!</div>
            }
        </div>
    )
}
export default PostCard;
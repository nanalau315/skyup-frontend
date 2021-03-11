// need to add currentUser Img and Post img => ADDED!!
// post image added!!!!! => ADDED!!

import React, {useState, useEffect} from 'react';
import UserCommentList from './UserCommentList';
import UserPostEditForm from './UserPostEditForm';
import PostReportList from '../PostContainerFolder/PostReportList'

function UserPostCard({postId, currentUser, deletePost}){
    const API = "http://localhost:3001/"
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
    const [userPost, setUserPost] = useState(emptyPostHolder)
    const [showEditPostForm, setShowEditPostForm] = useState(false)
    const [userPostHonks, setUserPostHonks] = useState(userPost.honks.length)
    const [userPostComments, setUserPostComments] = useState(userPost.comments)
    const [showReportList, setShowReportList] = useState(false)
    const [postReportAmount, setPostReportAmount] = useState(userPost.postreports.length)
    
    useEffect(() => {
        fetch(`${API}posts/${postId}`)
            .then(r => r.json())
            .then(post => {
                setUserPost(post)
                setUserPostHonks(post.honks.length)
                setPostReportAmount(post.postreports.length)
                setUserPostComments(post.comments)
            })
    },[postId, postReportAmount])

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
        <div className="user-post-card-div">
            {postReportAmount < 2
                ? <div>
                    {/* <h1>User Post Card#{userPost.id}</h1> */}
                    <div className="user-post-card-header-div">
                        {userPost.user.image_url
                            ? <img 
                                src={userPost.user.image_url}
                                alt={userPost.author}
                            />
                            : <img 
                                src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
                                alt={userPost.author}
                            />
                        }
                        <h4>{userPost.author}</h4>
                    </div>
                    <div className="user-post-card-post-img-div">
                        {userPost.image_url
                            ? <img 
                                src={userPost.image_url}
                                alt={userPost.content}
                            />
                            : null
                        }
                    </div>
                    <div className="post-card-honk-div">
                        {currentUserHonks < 50
                            ? <span onClick={handleHonk}><i class="fas fa-bullhorn">  {userPostHonks}!</i></span>
                            : "You've honk the maximum amount!"
                        }
                    </div>
                    {/* <h4>{userPostHonks} Honk Icon Here</h4> */}
                    <div className="post-card-post-content-div">
                        <h4>{userPost.content}</h4>
                        <p>{userPost.created_time} ago</p>
                    </div>
                    <UserCommentList
                        postId={userPost.id} 
                        userPostComments={userPostComments}
                        setUserPostComments={setUserPostComments}
                        currentUser={currentUser}
                    />
                    <div className="post-card-edit-post-button-div">
                        {userPost.user_id === currentUser.id
                            ? <button 
                                onClick={()=> setShowEditPostForm(showEditPostForm => !showEditPostForm)}>
                                <i class="far fa-edit"> Edit Post</i>
                                </button>
                            : null
                        }
                    </div>
                    {showEditPostForm 
                        ? <div>
                            <UserPostEditForm 
                                post={userPost} 
                                editPost={editPost}
                                currentUser={currentUser}
                                deletePost={deletePost}
                            />
                            </div> 
                        : null
                    }
                    <div className="post-card-edit-post-button-div">
                        {userPost.user_id !== currentUser.id
                            ? <button onClick={() => setShowReportList((showReportList) => !showReportList)}>
                                <div className="post-card-report-button-div"><i class="fas fa-ban"></i> <p>{postReportAmount}</p></div>
                            </button>
                            : null
                        }
                    </div>
                    {showReportList
                        ? <PostReportList
                            postId={userPost.id}
                            reports={userPost.postreports}
                            currentUser={currentUser}
                            setPostReportAmount={setPostReportAmount}
                        />
                        :null
                    }
                </div>
                : <div className="reported-post-div">This post has been reported by members of the community too many times so it has been hide!</div>
            }
        </div>
    )
}
export default UserPostCard;

// console.log(post.comments[0].comment)
// console.log(post.honks.length)
// console.log(post.content)
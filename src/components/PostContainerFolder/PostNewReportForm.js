import React, {useState} from 'react';

function PostNewReportForm({currentUser, postId, addReport}){
    const API = "http://localhost:3001/"
    const [reason, setReason] = useState("")
    const [reportOnce, setReportOnce] = useState(false)

    function handleSubmit(e){
        e.preventDefault()
        const newPostReport = {
            user_id: currentUser.id,
            post_id: postId,
            reason,
        }
        
        fetch(`${API}postreports`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPostReport)
        })
            .then(r => r.json())
            .then(reportObj=>{
                if (reportObj.id === null){
                    setReportOnce((reportOnce) => !reportOnce)
                } else {
                    addReport(reportObj)
                }
            })
        setReason("")
    }

    return(
        <div className="post-report-form-div">
            {!reportOnce
                ? <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="Why are you reporting this post?">
                            Why are you reporting this post?
                        </label>
                        <br/>
                        <div className="post-report-form-input-div">
                            <input 
                                className="report-input" 
                                type="text" 
                                name="reason" 
                                value={reason} 
                                onChange={(e)=>setReason(e.target.value)} 
                                placeholder={"Report as " +  currentUser.username} 
                                required
                            />
                            <button type="submit"><i class="fas fa-ban"></i></button>
                        </div>
                    </form>
                </div>
                : <div className="post-report-form-report-only-once-div">You can only report once!</div>
            }
        </div>
    )
}
export default PostNewReportForm;
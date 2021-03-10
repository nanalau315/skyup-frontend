import React, {useState} from 'react';

function PostEditReportForm({report, updateReport, deleteReport}){
    const API = "http://localhost:3001/"
    const [newReason, setNewReason] = useState(report.reason)
    
    function handleSubmit(e){
        e.preventDefault()
        fetch(`${API}postreports/${report.id}`,{
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({reason: newReason})
        })
            .then(r => r.json())
            .then(updatedReportObj=>{
                updateReport(updatedReportObj)
            })
        setNewReason("")
    }

    function handleDelete(){
        fetch(`${API}postreports/${report.id}`,{
            method: "DELETE",
        })
        deleteReport(report.id)
    }

    return(
        <div className="post-edit-report-form-div">
            <form className="post-edit-report-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="reason" 
                    value={newReason} 
                    onChange={(e)=>setNewReason(e.target.value)} 
                    placeholder={report.reason} 
                    required
                />
                <button type="submit"><i class="fas fa-check"></i></button>
            </form>
                <button onClick={handleDelete}>Delete Report!</button>
        </div>
    )
}

export default PostEditReportForm;
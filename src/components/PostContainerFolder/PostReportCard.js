import React, {useState} from 'react';
import PostEditReportForm from './PostEditReportForm'

function PostReportCard({report, currentUser, updateReport, deleteReport}){
    const [showEditReportForm, setShowEditReportForm] = useState(false)

    return(
        <div className="post-report-card-div">
            <h3>Post Report Card</h3>
            <p>{report.reason}</p>
            {report.user_id === currentUser.id 
                ? <button 
                    onClick={()=> setShowEditReportForm(showEditReportForm => !showEditReportForm)}>
                        Edit Report Icon!!
                    </button> 
                : null
            }
            {showEditReportForm 
                ? <div>
                    <PostEditReportForm
                        report={report}
                        updateReport={updateReport}
                        deleteReport={deleteReport}
                    />
                </div>
                : null
            }
        </div>
    )

}
export default PostReportCard;
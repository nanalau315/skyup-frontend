import React, {useState} from 'react';
import PostEditReportForm from './PostEditReportForm'

function PostReportCard({report, currentUser, updateReport, deleteReport}){
    const [showEditReportForm, setShowEditReportForm] = useState(false)

    return(
        <div className="post-report-card-div">
            <li>{report.reason}
            {report.user_id === currentUser.id 
                ? <button 
                    onClick={()=> setShowEditReportForm(showEditReportForm => !showEditReportForm)}>
                        <i class="far fa-edit"></i>
                    </button> 
                : null
            }</li>
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
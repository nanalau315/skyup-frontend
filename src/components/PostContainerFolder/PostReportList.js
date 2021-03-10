import React, {useState} from 'react';
import PostReportCard from './PostReportCard'
import PostNewReportForm from './PostNewReportForm'

function PostReportList({postId, reports, currentUser, setPostReportAmount}){
    const [postReports, setPostReports] = useState(reports)

    function addReport(reportObj){
        const newArr = [...postReports, reportObj]
        setPostReports(newArr)
        setPostReportAmount(newArr.length)
    }

    function updateReport(updatedReportObj){
        const newArr = postReports.map((report) => {
            if (report.id === updatedReportObj.id){
                return updatedReportObj
            } else {
                return report
            }
        })
        setPostReports(newArr)
        setPostReportAmount(newArr.length)
    }
    
    function deleteReport(id){
        const newArr = postReports.filter((report) => {
            return report.id !== id
        })
        setPostReports(newArr)
        setPostReportAmount(newArr.length)
    }

    // const currentUserReportList

    const reportCard = postReports.map((report) => {
        return (
            <PostReportCard
                key={report.id}
                report={report}
                currentUser={currentUser}
                updateReport={updateReport}
                deleteReport={deleteReport}
            />
        )
    })

    return (
        <div className="post-report-list-div">
            {reportCard.length > 0 
                ? <p>Reasons of Reporting:</p>
                : null
            }
            {reportCard}
            <PostNewReportForm
                currentUser={currentUser}
                postId={postId}
                addReport={addReport}
            />
        </div>
    )
}

export default PostReportList;
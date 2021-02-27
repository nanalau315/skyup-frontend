import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function PostContainer({currentUser}){
    const API = "http://localhost:3001/"
    const [posts, setPosts] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        fetch(`${API}posts/${id}`)
            .then(r => r.json())
            .then(postArr => {
                setPosts(postArr)
            })
    }, [id])

    return(
        <div>
            <h1>Hello! PostContainer</h1>
        </div>
    )

}
export default PostContainer;
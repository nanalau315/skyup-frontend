//need to add user img!

import React from 'react';

function SearchCard({user, currentUser}){
    // console.log(user)
    // const API = "http://localhost:3001/"

    return(
        <div className="search-card-div">
            <h3>SearchCard</h3>
            {/* user's img */}
            {user.username}
        </div>
        
    )
}
export default SearchCard;
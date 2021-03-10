//need to add user img! => ADDED!!

import React from 'react';

function SearchCard({user}){
    return(
        <div className="search-card-div">
            {user.image_url
                ? <img 
                    src={user.image_url}
                    alt={user.username}
                />
                : <img 
                    src="https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
                    alt={user.username}
                />
            }
            <div className="search-card-username">{user.username}</div>
        </div>
        
    )
}
export default SearchCard;
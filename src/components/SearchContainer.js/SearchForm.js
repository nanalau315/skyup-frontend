import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import SearchCard from './SearchCard'

function SearchForm ({currentUser}){
    const API = "http://localhost:3001/"
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch(`${API}users`)
            .then(r => r.json())
            .then(userArr => {
                setUsers(userArr)
            })
    },[])

    const filteredUser = users.filter((user) => {
        return user.username.toLowerCase().includes(search.toLowerCase())
    })
    .filter((user) => {
        return user.id !== currentUser.id
    })
    .map((user) => {
        return (
            <Link to={`/user/${user.id}`}>
                <SearchCard
                    key={user.id}
                    user={user}
                    // currentUser={currentUser}
                />
            </Link>
        )
    })
    
    return(
        <div className="search-form-div">
            <h3>Search User By Username <i class="fas fa-search"></i></h3>
            <input
                type="text"
                placeholder="Search By Username"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-card-main-div">
                {filteredUser}
            </div>    
        </div>
    )
}
export default SearchForm;
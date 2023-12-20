import React, { useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default function Search() {
    const[usersearch, setUsersearch] = useState("");
    const[user, setUser] = useState(null);
    const[error, setError] = useState(false);
    
    async function handleSearch() {
        //search users with a firebase query
        const q = query(collection(db, "users"), where("displayName", "==", usersearch));

        try {
            //execute the query
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
            console.log(user)
            
        } catch (error) {
            setError(error);
            console.log(error)
        }
    }

    function handleKey(e) {
        e.code === "Enter" && handleSearch();
    }

    return (
        <div className='search'>
            <div className="find">
                <input type="text" placeholder='Find chat' onKeyDown={handleKey} onChange={e=>setUsersearch(e.target.value)}/>
            </div>
            {error && <span>User not found!</span>}
            {user && <div className="users">
                <img src={user.photoURL} alt="Profile Picture" />
                <div className="users-info">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

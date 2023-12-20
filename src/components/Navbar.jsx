import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'



export default function Navbar() {

    const { currentUser } = useContext(AuthContext);

    return (
        <div className='navbar'>
            <span className="logo">Fireside Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span id='displayName'>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    );
}

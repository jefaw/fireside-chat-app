import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'

export default function Navbar() {
    return (
        <div className='navbar'>
            <span className="logo">Fireside Chat</span>
            <div className="user">
                <img src="" alt="" />
                <span>NAME</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

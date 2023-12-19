import React from 'react'

export default function Navbar() {
    return (
        <div className='navbar'>
            <span className="logo">Fireside Chat</span>
            <div className="user">
                <img src="" alt="" />
                <span>NAME</span>
                <button>Logout</button>
            </div>
        </div>
    )
}

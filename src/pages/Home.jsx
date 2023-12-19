import React from 'react'
import Chatarea from '../components/Chatarea'
import Sidebar from '../components/Sidebar'

export default function Home() {
    return (
        <>
            <div className='home'>
                <div className="container">
                    <Sidebar />
                    <Chatarea />
                </div>
            </div>
        </>
        
    )
}
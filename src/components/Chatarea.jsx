import React from 'react'
import Messages from './Messages'

export default function Chatarea() {
    return (
        <div className='chatarea'>
            <div className="chat-nav">
                <span>Chatting with: User name</span>
            </div>
            <Messages />
        </div>
    )
}

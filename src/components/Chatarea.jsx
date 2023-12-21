import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext';

export default function Chatarea() {

    const { data } = useContext(ChatContext);

    return (
        <div className='chatarea'>
            <div className="chat-nav">
                <span>Chat with: {data.user?.displayName}</span>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

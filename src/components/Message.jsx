import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

export default function Message() {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext);
    return (
        <div className='message origin'>
            <div className="message-meta">
                <img src="" alt="" />
                <span>Timestamp</span>
            </div>
            <div className="message-content">
                <p>message text here is a message then what here is a longer</p>
                <img src="https://sass-lang.com/assets/img/logos/logo.svg" alt="" />
            </div>

        </div>
    )
}

import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

export default function Message({ message }) {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext);
    const divRef = useRef();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };


    //scroll into view on new messages
    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    // console.log(message)
    // console.log(message.date.toDate())
    return (
        <div ref={divRef} className={`message ${message.senderId === currentUser.uid && "origin"}`}>
            <div className="message-meta">
                <img alt="Profile icon" src={message.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                    }  
                />
                <span>{message.date.toDate().toLocaleString(undefined, options)}</span>
                
            </div>
            <div className="message-content">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="Image" />}
            </div>

        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';

export default function Chats() {
    const [convos, setConvos] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    //realtime convos retrieval using firebase onSnapshot 
    useEffect(() => {
        const getConvos = () => {
            //subscribe to changes in firestore doc
            const unsub = onSnapshot(doc(db, "convos", currentUser.uid), (doc) => {
                setConvos(doc.data());
            });
            
            //cleanup function
            return () => {
                unsub();
            };
        };
        
        currentUser.uid && getConvos();
    }, [currentUser.uid]);
    // console.log(Object.entries(convos))
        
    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user });
    };

    return (
        <div className='chats'>
            {Object.entries(convos)?.map(convo => (
                //key= uid
                <div className="users" key={convo[0]} onClick={()=>handleSelect(convo[1].userInfo)}>
                    <img src={convo[1].userInfo.photoURL} alt="Profile Picture" />
                    <div className="users-info">
                        <span>{convo[1].userInfo.displayName}</span>
                        <p>{convo[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
            
            {/* dummy user */}
            <div className="users">
                <img src="https://th.bing.com/th/id/OIG.vKLFI7Sx6L.WA6uUC.Bd?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Profile Picture" />
                <div className="users-info">
                    <span>Demo User</span>
                    <p>Latest message</p>
                </div>
            </div>
        </div>
    );
    
}

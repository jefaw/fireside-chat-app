import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import {v4 as uuid} from 'uuid';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function Input() {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext);

    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    async function handleSend(){
        //update the message array in the document
        //if image, first upload the image to storage before updating doc
        //same logic as register
        if (image){
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        img: downloadURL,
                    }),
                });
            })
            .catch((error) => {
                //errors during upload or document update
                console.error("Error:", error);
            });

        }
        else{
            await updateDoc(doc(db, "chats", data.chatId),{
                messages: arrayUnion({
                    id:uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            })
        }

        //upldate latest message field with timestamp to display in the sidebar for both chat users
        await updateDoc(doc(db, "convos", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
        
        await updateDoc(doc(db, "convos", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        //clear input
        setText("");
        setImage(null);
    }

    function handleKey(e) {
        e.code === "Enter" && handleSend();
    }

    return (
        <>

            <div className='input'>
                <input type="text" name="message" id="text-input" 
                placeholder='Type message here' 
                onChange={(e) => setText(e.target.value)}
                value={text}
                onKeyDown={handleKey} 
                />
                <div className="send">
                    <input type="file" name="image-file" id="file" onChange={(e) => setImage(e.target.files[0])}/>
                    <label htmlFor="file">
                        Upload Image
                    </label>
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </>
        
    )
}

import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export default function Input() {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext);

    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    return (
        <>

            <div className='input'>
                <input type="text" name="" id="" placeholder='Type message here' />
                <div className="send">
                    <input type="file" name="" id="file" />
                    <label htmlFor="file">
                        Upload Image
                    </label>
                    <button>Send</button>
                </div>
            </div>
        </>
        
    )
}

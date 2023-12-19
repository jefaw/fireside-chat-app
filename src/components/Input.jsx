import React from 'react'

export default function Input() {
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

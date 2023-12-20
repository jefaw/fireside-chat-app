import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { AuthContext } from '../context/AuthContext';

export default function Search() {
    const[usersearch, setUsersearch] = useState("");
    const[user, setUser] = useState(null);
    const[error, setError] = useState(false);
    
    const { currentUser } = useContext(AuthContext);
    
    async function handleSearch() {
        //search users with a firebase query
        const q = query(collection(db, "users"), where("displayName", "==", usersearch));

        try {
            // //execute the query
            const querySnapshot = await getDocs(q);
            // check if any documents are found
            if (querySnapshot.size === 0) {
                // no user found
                setError(true);
            } else {
                // user found, get the first document's data
                const userDoc = querySnapshot.docs[0];
                setUser(userDoc.data());
                setError(false);
            }
            
        } catch (error) {
            setError(true);
        }
        // console.log(error)
    }

    function handleKey(e) {
        e.code === "Enter" && handleSearch();
    }

    async function handleSelect(e) {
        //add selected user to a chat by creating a new document
        //first check if there is already an existing chat between the two users (in chats collection)
        //if not, then create a new chat for the two users using a joined id
        // and add the id to the convos collection
        //convos are the list of chats
        
        const joinedUid = currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;

            try {
                const res = await getDoc(doc(db, "chats", joinedUid));
                
                
                if (!res.exists()){
                    // create a new chat document
                    await setDoc(doc (db, "chats", joinedUid), { messages:[] });
                    
                    //create users' convos
                    await updateDoc(doc(db, "convos", currentUser.uid), {
                        //nested
                        [joinedUid + ".userInfo"]: {
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                        },
                        [joinedUid + ".date"]: serverTimestamp(),
                    });
            
                    await updateDoc(doc(db, "convos", user.uid), {
                        [joinedUid + ".userInfo"]: {
                            uid: currentUser.uid,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                        },
                        [joinedUid + ".date"]: serverTimestamp(),
                    });
                    
                }
            } catch (error) {}
                
            setUser(null);
            setUsersearch("");

    }

    return (
        <div className='search'>
            <div className="find">
                <input type="text" placeholder='Find chat' 
                onKeyDown={handleKey} 
                onChange={e=>setUsersearch(e.target.value)}
                value={ usersearch }
                />
            </div>
            {error && <span>User not found!</span>}
            {user && (<div className="users" onClick={handleSelect}>
                <img src={user.photoURL} alt="Profile Picture" />
                <div className="users-info">
                    <span>{user.displayName}</span>
                </div>
            </div>)}
        </div>
    )
}

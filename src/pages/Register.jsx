import React, { useState } from 'react'
import Upload from "../assets/upload.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const[error, setError] = useState(false)
  const[errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e){
    e.preventDefault();
    // console.log(e.target[0].value)
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
      const create = await createUserWithEmailAndPassword(auth, email, password)
      // console.log(user);

      const storageRef = ref(storage, username); //ref to image in the storage will be username

      const uploadTask = uploadBytesResumable(storageRef, file);


      uploadTask.on(
        
        (error) => {
          // Handle unsuccessful uploads
          setError(true);
          console.log(error)
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(create.user, {
              username,
              photoURL: downloadURL,
            });
            console.log('File available at', downloadURL);
            //add user profile to firestore for the purpose of finding them in the search
            await setDoc(doc(db, "users", create.user.uid),{
              uid: create.user.uid,
              username,
              email, 
              photoURL: downloadURL
            });
          });
        }
      );
      
    }
    catch(error){
      setError(true)
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMsg(errorMessage);
      console.log(errorMessage);
    };
  }
  

  return (
    <>
        <div className="form-box">
          <div className="form-wrapper">
              <span className="logo">Fireside Chat</span>
              <span className="wrapper-title">Register</span>
              <form onSubmit={handleSubmit}>
                  <input type="text" name="" id="" placeholder="username"/>
                  <input type="email" name="" id="" placeholder="email"/>
                  <input type="password" name="" id="" placeholder="password"/>
                  <input type="file" name="" id="file" />
                  <label htmlFor="file">
                    <img src={Upload} alt="" id='upload'/>
                    <span>Upload a profie picture</span>
                  </label>
                  <button className="signup-btn">Sign up</button>
                  {error && <span>{errorMsg}</span>}
              </form>
              
              <p>Already registered? Login</p>
          </div>
        </div>    
    </>
  )
}

import React, { useState } from 'react'
import Upload from "../assets/upload.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const[error, setError] = useState(false)
  const[errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  function handleRedirect(){
    navigate("/login");
  }

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

      //Create a unique image name
      // const date = new Date().getTime();
      // const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update / add profile picture
            await updateProfile(create.user, {
              username,
              photoURL: downloadURL,
            });
            //create a user on firestore to be findable on chat
            await setDoc(doc(db, "users", create.user.uid), {
              uid: create.user.uid,
              username,
              email,
              photoURL: downloadURL,
            });

            //create empty user chat conversations on firestore
            await setDoc(doc(db, "convos", create.user.uid), {});
            navigate("/");
          } catch (error) {
            console.log(error);
            setError(true);
            setErrorMsg(error.message);
          }
        });
      });
    } catch (error) {
      setError(true);
      setErrorMsg(error.message);
    }
  };
  

  return (
    <>
        <div className="form-box">
          <div className="form-wrapper">
              <span className="logo">Fireside Chat</span>
              <span className="wrapper-title">Register</span>
              <form onSubmit={handleSubmit}>
                  <input type="text" name="" id="username" placeholder="username"/>
                  <input type="email" name="" id="email" placeholder="email"/>
                  <input type="password" name="" id="password" placeholder="password"/>
                  <input type="file" name="" id="file" />
                  <label htmlFor="file">
                    <img src={Upload} alt="" id='upload'/>
                    <span>Upload a profie picture</span>
                  </label>
                  <button className="signup-btn">Sign up</button>
                  {error && <span>*{errorMsg}</span>}
              </form>
              
              <p>Already registered? <a onClick={handleRedirect}>Login</a></p>
          </div>
        </div>    
    </>
  )
}

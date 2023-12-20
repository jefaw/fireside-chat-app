import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
  const[error, setError] = useState(false);
  const[errorMsg, setErrorMsg] = useState("");

  function handleRedirect(){
    navigate("/register");
  }

  const navigate = useNavigate();

  //login functino
  async function handleSubmit(e){
    e.preventDefault();
    // console.log(e.target[0].value)
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      const login = await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } 
    catch (error) {
      setError(true);
      setErrorMsg(error.message);
    }

  }

  return (
    <>
        <div className="form-box">
          <div className="form-wrapper">
              <span className="logo">Fireside Chat</span>
              <span className="wrapper-title">Login</span>
              <form onSubmit={handleSubmit}>
                  <input type="email" name="" id="email" placeholder="email"/>
                  <input type="password" name="" id="password" placeholder="password"/>
                  <button className="login-btn">Login</button>
                  {error && <span>*{errorMsg}</span>}
              </form>
              
              <p>Not registered? <a onClick={handleRedirect}>Sign up here</a></p>
          </div>
        </div>    
    </>
  )
}
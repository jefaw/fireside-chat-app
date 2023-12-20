import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  function handleRedirect(){
    navigate("/register");
  }

  const navigate = useNavigate()

  return (
    <>
        <div className="form-box">
          <div className="form-wrapper">
              <span className="logo">Fireside Chat</span>
              <span className="wrapper-title">Login</span>
              <form>
                  <input type="email" name="" id="email" placeholder="email"/>
                  <input type="password" name="" id="password" placeholder="password"/>
                  <button className="login-btn">Login</button>
              </form>
              
              <p>Not registered? <a onClick={handleRedirect}>Sign up here</a></p>
          </div>
        </div>    
    </>
  )
}
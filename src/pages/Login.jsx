import React from 'react'

export default function Login() {
  return (
    <>
        <div className="form-box">
          <div className="form-wrapper">
              <span className="logo">Fireside Chat</span>
              <span className="wrapper-title">Login</span>
              <form>
                  <input type="email" name="" id="" placeholder="email"/>
                  <input type="password" name="" id="" placeholder="password"/>
                  <button className="login-btn">Login</button>
              </form>
              
              <p>Not registered? Sign up here</p>
          </div>
        </div>    
    </>
  )
}
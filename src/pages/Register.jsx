import React from 'react'

export default function Register() {
  return (
    <>
        <div className="form-box">
          <div className="form-wrapper">
              <span className="logo">Fireside Chat</span>
              <span className="wrapper-title">Register</span>
              <form>
                  <input type="text" name="" id="" placeholder="username"/>
                  <input type="email" name="" id="" placeholder="email"/>
                  <input type="password" name="" id="" placeholder="password"/>
                  <input type="file" name="" id="" />
                      
              </form>
              <button className="signup-btn">Sign up</button>
              <p>Already registered? Login here</p>
          </div>
        </div>    
    </>
  )
}

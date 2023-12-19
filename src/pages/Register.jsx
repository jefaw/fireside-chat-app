import React from 'react'
import Upload from "../assets/upload.jpg";

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
                  <input type="file" name="" id="file" />
                  <label htmlFor="file">
                    <img src={Upload} alt="" id='upload'/>
                    <span>Upload a profie picture</span>
                  </label>
                  <button className="signup-btn">Sign up</button>
              </form>
              
              <p>Already registered? Login</p>
          </div>
        </div>    
    </>
  )
}

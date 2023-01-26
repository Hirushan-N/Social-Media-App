import React, { Component, useState } from 'react'
import userService from '../../services/userService';
import './login.component.css'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const handleClick = event => {
    setIsActive(current => !current);
  };

  const [email, setEmail] = useState('test1@gmail.com');
  const [password, setPassword] = useState('test1');
  const [loginResponse, setLoginResponse] = useState();
  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const userLogin = (event) => {
    event.preventDefault();
    let loginRequest = {
      email: email,
      password: password
    }
    console.log("loginRequest => " + JSON.stringify(loginRequest));

    userService.login(loginRequest)
      .then((res) => {
        setLoginResponse(res);
        navigate('/home');
        console.log("loginResponse => " + JSON.stringify(loginResponse.data.content));
        console.log("token => " + JSON.stringify(loginResponse.data.token));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className='ocean'>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
      </div>
      <section>
        <div className={isActive ? 'container right-panel-active' : 'container'} id='container'>
          <div className='form-container sign-up-container'>
            <form>
              <h1>Sign Up</h1>
              <span>Use your Email for registration</span>
              <label>
                <input type="text" placeholder="Name" />
              </label>
              <label>
                <input type="date" placeholder="Date Of Birth" />
              </label>
              <label>
                <input type="email" placeholder="Email" />
              </label>
              <label>
                <input type="password" placeholder="Password" />
              </label>
              <button >Sign Up</button>
            </form>
          </div>
          <div className='form-container sign-in-container'>
            <form>
              <h1>Sign in</h1>
              <span>sign in using E-Mail Address</span>
              <label>
                <input type="email" placeholder="Email" onChange={changeEmailHandler} />
              </label>
              <label>
                <input type="password" placeholder="Password" onChange={changePasswordHandler} />
              </label>
              <a href="#">Forgot your password?</a>
              <button onClick={userLogin}>Sign In</button>
            </form>
          </div>
          <div className='overlay-container'>
            <div className='overlay'>
              <div className='overlay-panel overlay-left'>
                <div className='main-title'>
                  <h3>Surge SE Internship</h3>
                  <h3>2023</h3>
                  <h6>Nadeesh Hirushan</h6>
                </div>
                <h1>Sign in</h1>
                <p>Sign in here if you already have an account </p>
                <button className='ghost mt-5' onClick={handleClick}>Sign In Now</button>
              </div>
              <div className='overlay-panel overlay-right'>
                <div className='main-title'>
                  <h3>Surge SE Internship</h3>
                  <h3>2023</h3>
                  <h6>Nadeesh Hirushan</h6>
                </div>
                <h1>Create, Account!</h1>
                <p>Sign up if you still don't have an account ... </p>
                <button className='ghost' onClick={handleClick}>Sign Up Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import React, { useRef, useState } from 'react'
import userService from '../../services/userService';
import './login.component.css'
import { useNavigate } from 'react-router-dom';
import reCAPTCHA, { ReCAPTCHA } from "react-google-recaptcha";


export default function Login() {
  document.body.classList.add('overflow-hidden');
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const handleClick = event => {
    setIsActive(current => !current);
  };

  const captchaRef = useRef(null);

  const [name, setName] = useState('Ravindu Bhagya');
  const [gender, setGender] = useState('Not selected');
  const [email, setEmail] = useState('test1@gmail.com');
  const [password, setPassword] = useState('test1');
  const [loginResponse, setLoginResponse] = useState();
  const changeNameHandler = (event) => {
    setName(event.target.value);
  };
  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const userLogin = (event) => {
    event.preventDefault();
    //const token = captchaRef.current.getValue();
    //captchaRef.current.reset();
    let loginRequest = {
      email: email,
      password: password
    }
    console.log("loginRequest => " + JSON.stringify(loginRequest));

    userService.login(loginRequest)
      .then((res) => {
        setLoginResponse(res);
        if (res.status == 200) {
          navigate('/home', { state: res.data });
        }
        console.log("loginResponse => " + JSON.stringify(loginResponse.data.content));
        console.log("token => " + JSON.stringify(loginResponse.data.token));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const inputFile = useRef(null);
  const openImageDialog = event => {
    //console.log('openImageDialog');
    inputFile.current.click();
  };

  const [avatar, setAvatar] = useState('https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg');
  const [uploadedImage, setUploadedImage] = useState();
  const onChangeFile = event => {
    event.stopPropagation();
    event.preventDefault();
    setUploadedImage(event.target.files[0]);
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };

  const userSignUp = (event) => {
    event.preventDefault();
    let form = new FormData();
    form.append('name', name);
    form.append('gender', gender);
    form.append('email', email);
    form.append('password', password);
    form.append('profileImage', uploadedImage);
    console.log("loginRequest => " + JSON.stringify(form));

    userService.signUp(form)
      .then((res) => {
        if (res.status == 201) {
          console.log("loginResponse => " + JSON.stringify(res.data.content));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className='login-body'>
      <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={onChangeFile} />
      <div className='ocean'>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
      </div>
      <section>
        <div className={isActive ? 'auth-container right-panel-active' : 'auth-container'} id='auth-container'>
          <div className='form-container sign-up-container'>
            <form>
              <h1>Sign Up</h1>
              <span>Use your Email for registration</span>
              <div className="circle">
                <img className="profile-pic" src={avatar} />
              </div>
              <div className="p-image" onClick={openImageDialog}>
                <i className="fa fa-camera upload-button" />
              </div>
              <label>
                <input type="text" placeholder="Name" onChange={changeNameHandler} />
              </label>
              <label>
                <input type="email" placeholder="Email" onChange={changeEmailHandler} />
              </label>
              <label>
                <input type="password" placeholder="Password" onChange={changePasswordHandler} />
              </label>
              <button onClick={userSignUp}>Sign Up</button>
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
              <reCAPTCHA
                sitekey={'6Lc2sjAkAAAAAK1S-fAnCAKf7OxwMb7ceXQftrwN'}
                ref={captchaRef}
              />
              <a href='/'>Forgot your password?</a>
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
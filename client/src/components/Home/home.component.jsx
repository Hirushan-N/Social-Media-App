import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import postService from '../../services/postService'
import './home.component.css'

export default function Home() {
  document.body.classList.remove('overflow-hidden');
  const navigate = useNavigate();
  const location = useLocation();
  const authToken = location.state.token;
  //console.log("TOKEN === " + JSON.stringify(authToken));
  const loggedUser = location.state.content;
  const profileImage = 'http://localhost:5000/' + loggedUser.profileImage.replace(/\\/g, "/");

  //console.log("USER === " + JSON.stringify(loggedUser));

  const [postArr, setPostArr] = useState([]);
  useEffect(() => {
    postService.getAllPosts(authToken).
      then((res) => res)
      .then(data => {
        setPostArr(data.data.content.Posts);
        //console.log(data.data.content.Posts);
      })
  }, []);

  const [isSettingsMenuActive, setIsSettingsMenuActive] = useState(false);
  const settingsMenuToggle = event => {
    setIsSettingsMenuActive(current => !current);
  };

  const lightThemeHandler = event => {
    document.body.classList.toggle('light-theme');
  };

  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = event => {
    setIsLiked(current => !current);
    // postService.updatePost().
    // then((res) => res)
    // .then(data => {
    //   setPostArr(data.data.content.Posts);
    //   //console.log(data.data.content.Posts);
    // })
  };

  const inputFile = useRef(null);
  const openImageDialog = event => {
    //console.log('openImageDialog');
    inputFile.current.click();
  };

  const [previewPostImage, setPreviewPostImage] = useState();
  const [previewPostImageRemoveBtnStatus, setPreviewPostImageRemoveBtnStatus] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();
  const onChangeFile = event => {
    event.stopPropagation();
    event.preventDefault();
    setUploadedImage(event.target.files[0]);
    setPreviewPostImage(URL.createObjectURL(event.target.files[0]));
    setPreviewPostImageRemoveBtnStatus(true);
    console.log(uploadedImage);
  };

  const [postCaption, setPostCaption] = useState();
  const creteNewPost = event => {
    //console.log('creteNewPost');
    const d = new Date();
    let datetime = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}Z`
    //let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + 'T' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + 'Z';
    let form = new FormData();
    form.append('user', loggedUser._id);
    form.append('caption', postCaption);
    form.append('datetime', datetime);
    form.append('likes', 0);
    form.append('postImage', uploadedImage);
    postService.createPost(form,authToken)
      .then((res) => {
        if (res) {
          if (res.status == 201) {
            console.log(JSON.stringify(res.data));
            navigate('/home', { state: location.state });
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      })

  };

  //----------------------------------------Design Body -----------------------------------------------------------
  return (
    <div className='home-body'>
      <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={onChangeFile} />
      <nav>
        <div className='nav-left'>
          <a href='/home'>
            <img alt='' src='/assets/logos/surgelogo.png' className='logo' />
          </a>
          <ul>
            <li><img src='https://i.postimg.cc/Fs3m1Djy/notification.png' /></li>
            <li><img src='https://i.postimg.cc/YqGKZ8nc/inbox.png' /></li>
            <li><img src='https://i.postimg.cc/xCzpgFjg/video.png' /></li>
          </ul>
        </div>
        <div className='nav-right'>
          <div className='search-box'>
            <img src='https://i.postimg.cc/SKtHgM6Q/search.png' />
            <input type='text' placeholder='Search' />
          </div>
          <div className='nav-user-icon online' onClick={settingsMenuToggle}>
            <img src={profileImage} />
          </div>
        </div>
        {/*--------------Settings Menu'---------------------*/}
        <div className={isSettingsMenuActive ? 'settings-menu settings-menu-height' : 'settings-menu'}>
          <div id='dark-btn' onClick={lightThemeHandler}>
            <span />
          </div>
          <div className='settings-menu-inner'>
            <div className='user-profile'>
              <img src={profileImage} />
              <div>
                <p>{loggedUser.name}</p>
                <a href='profile.html'>See your profile</a>
              </div>
            </div>
            <hr />
            <div className='user-profile'>
              <img src='https://i.postimg.cc/hv3nx52s/feedback.png' />
              <div>
                <p>Give Feedback</p>
                <a href='/home'>Help us to improve the new design</a>
              </div>
            </div>
            <hr />
            <div className='settings-links'>
              <img src='https://i.postimg.cc/QCcPNYRV/setting.png' className='settings-icon' />
              <a href='/home'>Settings &amp; Privacy <img src='https://i.postimg.cc/RF1dBMWr/arrow.png' width='10px' /></a>
            </div>
            <div className='settings-links'>
              <img src='https://i.postimg.cc/C5tydfK6/help.png' className='settings-icon' />
              <a href='/home'>Help &amp; Support<img src='https://i.postimg.cc/RF1dBMWr/arrow.png' width='10px' /></a>
            </div>
            <div className='settings-links'>
              <img src='https://i.postimg.cc/5yt1XVSj/display.png' className='settings-icon' />
              <a href='/home'>Display &amp; Accessibility <img src='https://i.postimg.cc/RF1dBMWr/arrow.png' width='10px' /></a>
            </div>
            <div className='settings-links'>
              <img src='https://i.postimg.cc/PJC9GrMb/logout.png' className='settings-icon' />
              <a href='/' >Logout <img src='https://i.postimg.cc/RF1dBMWr/arrow.png' width='10px' /></a>
            </div>
          </div>
        </div>
      </nav>
      <div className='container'>
        {/*--------------Left Sidebar---------------------*/}
        <div className='left-sidebar'>
          <div className='imp-links'>
            <a href='/home' ><img src='https://i.postimg.cc/RCj4MjnC/news.png' />Latest News</a>
            <a href='/home'><img src='https://i.postimg.cc/MpBwMtV0/friends.png' />Friendss</a>
            <a href='/home'><img src='https://i.postimg.cc/44FRWj1b/group.png' />Group</a>
            <a href='/home'><img src='https://i.postimg.cc/0jh39RtT/marketplace.png' />Marketplace</a>
            <a href='/home'><img src='https://i.postimg.cc/VsXHCTVk/watch.png' />Watch</a>
            <a href='/home'>See More</a>
          </div>
          <div className='shortcut-link'>
            <p>Your Shortcuts</p>
            <a href='/home'><img src='https://i.postimg.cc/3JHVf7vG/shortcut-1.png' />Web Developers</a>
            <a href='/home'><img src='https://i.postimg.cc/rFCbvb1P/shortcut-2.png' />Web Design course</a>
            <a href='/home'><img src='https://i.postimg.cc/0yk3xfZ2/shortcut-3.png' />Full Strack Development</a>
            <a href='/home'><img src='https://i.postimg.cc/Z5wQqdDP/shortcut-4.png' />Website Experts</a>
          </div>
        </div>
        {/*--------------Main Sidebar---------------------*/}
        <div className='main-content'>
          <div className='story-gallery'>
            <div className='story story1'>
              <img src='https://i.postimg.cc/TPh453Zz/upload.png' />
              <p>Post Story</p>
            </div>
            <div className='story story2'>
              <img src='https://i.postimg.cc/XNPtfdVs/member-1.png' />
              <p>Alison</p>
            </div>
            <div className='story story3'>
              <img src='https://i.postimg.cc/4NhqByys/member-2.png' />
              <p>Jackson</p>
            </div>
            <div className='story story4'>
              <img src='https://i.postimg.cc/FH5qqvkc/member-3.png' />
              <p>Samona</p>
            </div>
            <div className='story story5'>
              <img src='https://i.postimg.cc/Sx65bPcP/member-4.png' />
              <p>John Doe</p>
            </div>
          </div>
          <div className='write-post-container'>
            <div className='user-profile'>
              <img src={profileImage} />
              <div>
                <p>{loggedUser.name}</p>
                <small>Public <i className='fa fa-caret-down' /></small>
              </div>
            </div>
            <div className='post-input-container'>
              <textarea rows={3} placeholder={'What\'s on your mind, ' + loggedUser.name + '?'} defaultValue={''} onChange={(e) => setPostCaption(e.target.value)} />
              <div className='post-Image-container'>
                <img src={previewPostImage} className='post-img' />
                <button className={previewPostImageRemoveBtnStatus? 'btn btn-danger':'btn btn-danger invisible'} onClick={(e)=>{setPreviewPostImage(''); setPreviewPostImageRemoveBtnStatus(false);}}><i className='fa fa-trash'></i></button>
              </div>
              <div className='add-post-links'>
                <a href='/home'><img src='https://i.postimg.cc/QMD2BDXs/live-video.png' />Live Video</a>
                <a onClick={openImageDialog}><img src='https://i.postimg.cc/6pKKZn0D/photo.png' />Photo/Video</a>
                <a href='/home'><img src='https://i.postimg.cc/Pf6TBCdD/feeling.png' />Feling/Activity</a>
                <button href='/home' className='btn btn-primary' onClick={creteNewPost}>Upload</button>
              </div>
            </div>
          </div>
          {
            /* LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP LOOP */
            postArr.map((post) => (
              <div className='post-container' key={post._id}>
                <img src={'http://localhost:5000/' + post.postImage.replace(/\\/g, "/")} className='post-img' />
                <span>{post.datetime}</span>
                <p className='post-text'>{post.caption}</p>
                <div className='post-row'>
                  <div href='/home' className='activity-icons'>
                    <div id='like-btn' className={isLiked ? 'fb-heart fa fa-heart fa-lg' : 'fa fa-heart fa-lg'} onClick={likeHandler}><span>{post.likes}</span></div>
                    <div className='fb-text'>{post.user.name}</div>
                    <div className='fb-days'>2d</div>
                  </div>
                </div>
              </div>
            ))
            /* ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP ENDLOOP */
          }
          <button type='button' className='load-more-btn'>Load More</button>
        </div>
        {/*--------------Right Sidebar---------------------*/}
        <div className='right-sidebar'>
          <div className='sidebar-title'>
            <h4>Profile</h4>
            <a href='/home'>See All</a>
          </div>
          <div className='event'>
            <div className='left-event'>
              <img src={profileImage} />
            </div>
            <div className='right-event'>
              <h4>{loggedUser.name}</h4>
              <a href='/home'>View Profile</a>
            </div>
          </div>
          <div className='sidebar-title'>
            <h4>Advertisement</h4>
            <a href='/home'>close</a>
          </div>
          <img src='https://i.postimg.cc/CLXYx9BL/advertisement.png' className='siderbar-ads' />
          <div className='sidebar-title'>
            <h4>Conversation</h4>
            <a href='/home'>Hide Chat</a>
          </div>
          <div className='online-list'>
            <div className='online'>
              <img src='https://i.postimg.cc/XNPtfdVs/member-1.png' />
            </div>
            <p>Alison Mina</p>
          </div>
          <div className='online-list'>
            <div className='online'>
              <img src='https://i.postimg.cc/4NhqByys/member-2.png' />
            </div>
            <p>Jackson Aston</p>
          </div>
          <div className='online-list'>
            <div className='online'>
              <img src='https://i.postimg.cc/FH5qqvkc/member-3.png' />
            </div>
            <p>Samona Rose</p>
          </div>
          <div className='online-list'>
            <div className='online'>
              <img src='https://i.postimg.cc/Sx65bPcP/member-4.png' />
            </div>
            <p>Mike Pérez</p>
          </div>
        </div>
      </div>
      <div className='footer'>
        <p>Copyright 2023 - Nadeesh Hirushan</p>
      </div>
    </div>
  );
}



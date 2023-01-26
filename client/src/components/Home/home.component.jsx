import React, { Component, useState } from 'react'
import postService from '../../services/postService'
import './home.component.css'

export default function Home(){
  const [postArr , setPostArr] = useState();
  const [postCount , setPostCount] = useState(0);
    postService.getAllPosts().then((res)=>{
      if(res){
        setPostArr(res.data.content.Posts);
        console.log(postArr);
      }
    })
    return (
      <div>
      {/* {
        postArr.map((p)=>{
          <h1>Welcome to Surge Global</h1>
        })
      } */}
      <h1>Welcome to Surge Global</h1>
      </div>
    )
}

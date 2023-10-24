import React from "react";
import { useState } from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    
    const [post , setPost] = useState({title:'', body:''});
    
    const addNewPost = (event) => {
        event.preventDefault();
        const newPost = {
            ...post,
            id: Date.now()
        }
        create(newPost);

        setPost({title:'', body: ''})  
      }

    return (
        <div >
            <form className = 'form'> 
                <MyInput
                    value = {post.title} 
                    onChange = { event => setPost({...post, title: event.target.value})}
                    type = 'text' 
                    placeholder = 'new title'
                /><br/>
                
                <MyInput
                    value = {post.body} 
                    onChange = { event => setPost({...post, body: event.target.value})}
                    type = 'text' 
                    placeholder='body'
                />
                <MyButton onClick = {addNewPost}>Create post</MyButton>
            </form>
        </div>
    )
}

export default PostForm;
import React from "react";
import '../styles/App.css';
import PostItem from "./PostItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";


export default function PostList({remove, posts, listTitle}) {
    if(!posts.length) {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>
                    Post list empty !
                </h1>
            </div>
        )
    }
    return (
        <div>
            <h1 style={{textAlign:'center'}}>
                {listTitle}
            </h1>
            <TransitionGroup>
                { posts.map( (post, index) => 
                <CSSTransition
                    classNames="post"
                    key={post.id}
                    timeout={500}
                    >
                    <PostItem  remove = {remove} number={index + 1} post={post}/> 
                </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};
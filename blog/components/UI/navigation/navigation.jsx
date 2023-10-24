import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

export default function Navigation() {
    return(
        <div className='navigation'>
        <div className='navigation__links'>
          <Link to='/about'>About site</Link>
          <Link to='/posts'>Posts</Link>
        </div>
    </div>
    )
}
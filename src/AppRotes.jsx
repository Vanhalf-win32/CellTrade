import React from "react";
import { Route, Routes } from 'react-router-dom';
import CheckImei from "./components/checkimei";
import Index from "./components";
import CheckPhone from "./components/checkphone";
import CheckDisplay from "./components/checkdisplay";
import PrelimDiscount from "./components/prelimdiscount";
import CheckDefect from "./components/checkdefect";
import CheckPhoto from "./components/checkphoto";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<Index/>}/>
            <Route path='/checkimei' element={<CheckImei/>}/>
            <Route path='/checkphone' element={<CheckPhone/>}/>
            <Route path='/checkdisplay' element={<CheckDisplay/>}/>
            <Route path='/prelimdiscount' element={<PrelimDiscount/>}/>
            <Route path='/checkdefect' element={<CheckDefect/>}/>
            <Route path='/checkphoto' element={<CheckPhoto/>}/>
            {/* <Route path='/checkphone' element={<CheckPhone/>}/>
            <Route path='/checkdisplay' element={<CheckDisplay/>}/> */}
            {/* <Route path='/About' element={<About/>} />
            <Route path='/Posts' element={<Posts/>} />
            <Route path='/posts/:id' element={<PostIdPage/>} /> */}    
      </Routes>
    );
};

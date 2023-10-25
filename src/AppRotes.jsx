import React from "react";
import { Route, Routes } from 'react-router-dom';
import CheckImei from "./components/checkimei";
import Index from "./components";
import CheckPhone from "./components/checkphone";
import CheckDisplay from "./components/checkdisplay";
import PrelimDiscount from "./components/prelimdiscount";
import CheckDefect from "./components/checkdefect";
import CheckPhoto from "./components/checkphoto";
import Thanks from "./components/thanks";
import Verification from "./components/verification";
import TotalDiscount from "./components/totaldiscount";
import PickUpDevice from "./components/pickupdevice";
import ConsigAgree from "./components/consigagree";
import Contract from "./components/contract";
import Signed from "./components/signed";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path='' element={<Index/>}/>
            <Route path='/login' element={<Index/>}/>
            <Route path='/checkimei' element={<CheckImei/>}/>
            <Route path='/checkphone' element={<CheckPhone/>}/>
            <Route path='/checkdisplay' element={<CheckDisplay/>}/>
            <Route path='/prelimdiscount' element={<PrelimDiscount/>}/>
            <Route path='/checkdefect' element={<CheckDefect/>}/>
            <Route path='/checkphoto' element={<CheckPhoto/>}/>
            <Route path='/thanks' element={<Thanks/>}/>
            <Route path='/verification' element={<Verification/>}/>
            <Route path='/totaldiscount' element={<TotalDiscount/>}/> 
            <Route path='/pickupdevice' element={<PickUpDevice/>}/>
            <Route path='/consigagree' element={<ConsigAgree/>}/>
            <Route path='/contract' element={<Contract/>}/> 
            <Route path='/signed' element={<Signed/>}/>
      </Routes>
    );
};

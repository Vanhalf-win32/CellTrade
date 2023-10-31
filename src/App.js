import React from 'react';
import Header from './components/header';
// import AppRoutes from './AppRotes';
// import { BrowserRouter } from 'react-router-dom';
import Footer from './components/footer';
import './css/mixins.css';
import './css/style.css';
import './css/variables.css';
import './css/blocks/footer.css';
import CheckImei from './components/checkimei';
import CheckPhone from './components/checkphone';


export default function App() {
  return( 
    <div>
        <Header/>
        {/* <CheckImei/> */}
        <CheckPhone/>
         <Footer/>
    </div>
    // <BrowserRouter>
    //      
    //       <AppRoutes/>
    //     
    // </BrowserRouter>
  
	)  
};
import React from 'react';
import Header from './components/header';
import AppRoutes from './AppRotes';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/footer';
import './css/mixins.css';
import './css/style.css';
import './css/variables.css';
import './css/blocks/footer.css';



export default function App() {
  return( 
    <BrowserRouter>
         {/* <Header/> */}
         <AppRoutes/>
         <Footer/>
    </BrowserRouter>
	)  
};
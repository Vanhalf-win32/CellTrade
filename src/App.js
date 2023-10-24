import React from 'react';
import Header from './components/header';
import AppRoutes from './AppRotes';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/footer';


export default function App() {
  return( 
    <BrowserRouter>
         <Header/>
         <AppRoutes/>
         <Footer/>
    </BrowserRouter>
	)  
};
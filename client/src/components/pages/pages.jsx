import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HeaderNav from './components/navBar';
import Login from './components/login';
import RegisterSeller from './components/registerSeller';
import RegisterCustomer from './components/registerCustomer';


function Pages() {
  return (
    <div>
        <HeaderNav/>
        <Login/>
        <RegisterSeller/>
        <RegisterCustomer/>
    </div>
  )
}

export default Pages;
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from '../login';
import Home from '../home'
import RegisterSeller from '../registerSeller';
import RegisterCustomer from '../registerCustomer';
import Profile from '../perfil';
import Products from '../products';


const Pages = () => {

  return (
      <Routes>
        <Route path='/home' element= {<Home/>}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/registerseller' element= {<RegisterSeller/>}/>
        <Route path='/registercustomer' element= {<RegisterCustomer/>}/>
        <Route path='/my-profile' element= {<Profile/>}/>
        <Route path='/products' element= {<Products/>}/>
      </Routes>
  );
}

export default Pages;
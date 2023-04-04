import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from '../login';
import Home from '../home'
import RegisterSeller from '../registerSeller';
import RegisterCustomer from '../registerCustomer';
import Profile from '../perfil';


const Pages = () => {

  return (
      <Routes>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/' element= {<Home/>}/>
        <Route path='/registerseller' element= {<RegisterSeller/>}/>
        <Route path='/registercustomer' element= {<RegisterCustomer/>}/>
        <Route path='/my-profile' element= {<Profile/>}/>
      </Routes>
  );
}

export default Pages;
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from '../login';
import Home from '../home'
import RegisterSeller from '../registerSeller';
import RegisterCustomer from '../registerCustomer';
import Profile from '../perfil';
import NewProduct from '../newProduct';
import ProductsSeller from '../productsSeller';
import Products from '../products';
import RegisterGeneral from '../registerGeneral';
import ModifyProduct from '../modifyProduct';


const Pages = () => {
  return (
      <Routes>
        <Route path='/home' element= {<Home/>}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/registerseller' element= {<RegisterSeller/>}/>
        <Route path='/registercustomer' element= {<RegisterCustomer/>}/>
        <Route path='/my-profile' element= {<Profile/>}/>
        <Route path='/my-products' element= {<ProductsSeller/>}/>
        <Route path='/new-products' element= {<NewProduct/>}/>
        <Route path='/productos' element={<Products/>}/>
        <Route path='/register' element={<RegisterGeneral/>}/>
        <Route path='/modify-product/:productId' element={<ModifyProduct/>}/>
      </Routes>
  );
}

export default Pages;
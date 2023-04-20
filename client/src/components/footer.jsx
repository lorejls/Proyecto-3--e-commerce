import React from 'react';
import Logo2 from '../components/img/LOGO-white.png';
import Nav from "react-bootstrap/Nav";

const Footer = () => {
  return (
    <div className='footer'>
    <div className='container-footer'>
      <img  className='logo-footer' src={Logo2} alt="logo mercat" />
      <Nav.Link className='text-footer' href="#home">Nosotros</Nav.Link>
      <Nav.Link className='text-footer' href="#home">Productos</Nav.Link>
      <Nav.Link  className='text-footer' href="#home">hola@mercat.com</Nav.Link>
      <Nav.Link  className='text-footer' href="#home">638 22 55 66</Nav.Link>
    </div>
    </div>
  )
}

export default Footer
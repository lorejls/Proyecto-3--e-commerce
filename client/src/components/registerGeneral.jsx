import React from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom'

const RegisterGeneral = () => {
  return (
    <div className="main-container">
        <h2 className='saludo-home'>Hola!</h2>
        <div className='texto-centrado'>
        <p className='texto-secundario'>Comienza aquí tu proceso de registro</p>
        <p className='texto-secundario'>¿Qué deseas hacer dentro de MERCAT?</p>
        </div>
        <div className="botones">
        <Link to={'/registercustomer'}><button className='button violet'>Quiero comprar</button></Link>
        <Link to={'/registerseller'}><button className='button black'>Quiero vender</button></Link>
        </div>
    </div>
  )
}

export default RegisterGeneral
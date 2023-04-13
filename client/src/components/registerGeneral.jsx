import React from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom'

const RegisterGeneral = () => {
  return (
    <div>
        <h2>Hola!</h2>
        <p>¿Qué deseas hacer dentro de MERCAT?</p>
        <Button className='btn btn-dark'><Link to={'/registercustomer'}>Quiero comprar</Link></Button>
        <Button className='btn btn-secudary'><Link to={'/registerseller'}>Quiero vender</Link></Button>
    </div>
  )
}

export default RegisterGeneral
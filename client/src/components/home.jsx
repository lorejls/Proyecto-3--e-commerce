import React from 'react';
import Banner from '../components/img/banner-330px.png'
import { Link } from 'react-router-dom';


const Home = ()=>{
    
    return (
        <div className="main-container">
            <div className='banner'><img  src={Banner} alt="manos de hombre cultivando" /></div>
            <p>¿Sabías que comprando a pequeños productores apoyas el comercio local y ayudas a reducir el desperdicio alimentario? En MERCAT tenemos la misión de acercarte la producción de frutas y verduras de proximidad y llevarlas a tu casa directo desde la granja, como recién cosechadas. </p>
            <div><Link to={'/productos'} >PRODUCTOS DE LA SEMANA</Link></div>
        </div>
    )
}


export default Home;
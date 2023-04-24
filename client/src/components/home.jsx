import React from "react";
import Banner from "../components/img/banner-330px.png";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Fruits from '../components/img/frutas.jpg';
import Veggies from '../components/img/vegetales.jpg'

const Home = () => {
  return (
    <div className="main-container">
      <div className="banner">
        <img src={Banner} alt="manos de hombre cultivando" />
      </div>
      <p>
        ¿Sabías que comprando a pequeños productores apoyas el comercio local y
        ayudas a reducir el desperdicio alimentario? En MERCAT tenemos la misión
        de acercarte la producción de frutas y verduras de proximidad y
        llevarlas a tu casa directo desde la granja, como recién cosechadas.{" "}
      </p>
      <div className="titulo-home">
        PRODUCTOS DE LA SEMANA
      </div>
      <Link className="link"  to={"/productos"}>
      <Card className="card-home">
        <Card.Body>
          <Card.Title> VER VERDURAS</Card.Title>
          <Card.Img  src={Veggies} />
        </Card.Body>
      </Card></Link>
      <Link className="link bottom"  to={"/productos"}>
      <Card>
        <Card.Body>
          <Card.Title>VER FRUTAS</Card.Title>
          <Card.Img  src={Fruits} />
        </Card.Body>
      </Card></Link>
      <Link className="button green"  to={"/productos"}>Ver todos los productos</Link>
    </div>
  );
};

export default Home;

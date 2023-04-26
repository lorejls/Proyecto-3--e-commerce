import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import PERFIL from "../components/img/user.jpg"
import COMPANY from "../components/img/companyName.jpg"

const MyProfile = () => {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/api/user_profile", {
      headers: {
        Authorization: token,
      },
    });
    setUser(response.data.user);
    console.log(response);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="main-container">
      <h2 className="saludo-home">Mi perfil</h2>
      {role == 0 && (
        <div className="main-container">
        <Card className="margin-bottom" style={{ width: "18rem" }}>
          <Card.Img variant="top" src={PERFIL}/>
          <Card.Body>
            <Card.Title>Nombre: {user.name} {user.surname}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
            <ListGroup.Item>Dirección: {user.address}</ListGroup.Item>
            <ListGroup.Item>Dirección de envíos: {user.shippingAddress}</ListGroup.Item>
            <ListGroup.Item>Código postal: {user.postCode}</ListGroup.Item>
            <ListGroup.Item>
              N° de contacto: {user.contactNumber}
            </ListGroup.Item>
          </ListGroup>
          <div className="botones top bottom">
            <Link to={"/my-home"}>
              <button className="button narrow white">Volver</button>
            </Link>
            <Link to={"/modify-profile"}>
              <button className="button black narrow">Modificar</button>
            </Link>
          </div>
        </Card>
      </div>
      )}
      {role == 1 && (
        <div className="main-container">
          <Card className="margin-bottom" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={COMPANY}/>
            <Card.Body>
              <Card.Title>Empresa: {user.companyName}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Email: {user.email}</ListGroup.Item>
              <ListGroup.Item>Dirección: {user.address}</ListGroup.Item>
              <ListGroup.Item>Código postal: {user.postCode}</ListGroup.Item>
              <ListGroup.Item>
                N° de contacto: {user.contactNumber}
              </ListGroup.Item>
            </ListGroup>
            <div className="botones top bottom">
              <Link to={"/my-home"}>
                <button className="button narrow white">Volver</button>
              </Link>
              <Link to={"/modify-profile"}>
                <button className="button black narrow">Modificar</button>
              </Link>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MyProfile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

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
      <h2>Mi perfil</h2>
      {role == 0 && (
        <div>
          <h1>Nombre: {user.name}</h1>
          <h1>Apellido: {user.surname}</h1>
          <h2>Correo electrónico: {user.email}</h2>
          <h3>Dirección: {user.address}</h3>
          <h3>Dirección de envíos: {user.shippingAddress}</h3>
          <h3>Código postal: {user.postCode}</h3>
          <h3>Número de contacto: {user.contactNumber}</h3>
          <Link to={'/my-home'}><Button className='btn btn-secudary'>Volver</Button></Link>
          <Link to={'/modify-profile'}><Button  className='btn btn-dark' >Modificar perfil</Button></Link>
        </div>
      )}
      {role == 1 && (
        <div>
          <h1>Empresa: {user.companyName}</h1>
          <h2>Correo electrónico: {user.email}</h2>
          <h3>Dirección: {user.address}</h3>
          <h3>Código postal: {user.postCode}</h3>
          <h3>Número de contacto: {user.contactNumber}</h3>
          <Link to={'/my-home'}><Button className='btn btn-secudary'>Volver</Button></Link>
          <Link to={'/modify-profile'}><Button  className='btn btn-dark' >Modificar perfil</Button></Link>
          
        </div>
      )}
    </div>
  );
};

export default MyProfile;

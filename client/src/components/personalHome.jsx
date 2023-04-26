import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { Button } from "reactstrap";
import Products from "./products";

const PersonalHome = () => {
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
    console.log(response)
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  return (
    <div className="main-container">
      {role == 0 && (
        <div className="main-container">
        <Products/>
        </div>
      )}
      {role == 1 && (
        <div className="main-container">
        <h2 className='saludo-home'>Hola {user.companyName}!</h2>
        <div className='texto-centrado'>
        <p className='texto-secundario'>Vende tus productos en MERCAT, te ayudamos en el proceso</p>
        </div>
        <div className="botones">
        <Link to={'/new-products'}><button className='button black'>Crear un producto</button></Link>
        <Link to={'/my-products'}><button className='button white'>Ver mis productos</button></Link>
        </div>
    </div>
      )}
      {role == 2 && (
        <div>
          <h1>
            Hola {user.name} {user.surname}
          </h1>
          <p>Tienes permisos de administrador</p>
        </div>
      )}
    </div>
  );
};

export default PersonalHome;

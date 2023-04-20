import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import { Button } from "reactstrap";

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
        <div>
          <h1>
            Hola {user.name} {user.surname}
          </h1>
          <p>Te damos la bienvenida a MERCAT, comienza a comprar</p>

        </div>
      )}
      {role == 1 && (
        <div className="main-container">
          <h1>Hola {user.companyName}</h1>
          <p className="text-black big">
          Comienza a vender con MERCAT, te ayudamos en el proceso.
          </p>
          <div className="buttons-large">
          <Link to={'/new-products'}><Button  className='btn black large' >Crear un producto</Button></Link>
          <Link to={'/my-products'}><Button className='btn white large'>Ver mis productos</Button></Link>
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

import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
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
    // console.log(response)
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  return (
    <div>
      {role == 0 && (
        <div>
          <h1>
            Hola {user.name} {user.surname}
          </h1>
          <p>Te damos la bienvenida a MERCAT, comienza a comprar</p>
        </div>
      )}
      {role == 1 && (
        <div>
          <h1>Hola {user.companyName}</h1>
          <p>
            Te damos la bienvenida a MERCAT, comienza a vender tus productos
          </p>
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

export default Profile;

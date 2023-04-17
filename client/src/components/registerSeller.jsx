import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";

// Instalar dependencia axios para hacer la llamada al back-end (npm i axios)

const RegisterSeller = () => {
  // este es el estado inicial del user
  const [user, setUser] = useState({
    // esto hace que cada vez que inicio el login los campos del input indicados están vacíos listos para ingresar los datos
    companyName: "",
    email: "",
    password: "",
    address: "",
    postCode: "",
    contactNumber: "",
  });

  const [successM, setSuccessM] = useState(null);
  const [errorM, setErrorM] = useState(null);
  // el método e.target evita el refrescado del formulario
  // esta función es la que se encarga de completar el input, de rellenar su estado en tiempo real.
  // donde el valor del user cambia constantemente
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  // función encargada de obtener los datos del estado y enviarlos al back-end
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register_seller",
        { ...user }
      );
      console.log(response.data);
      setSuccessM(response.data.message);
      localStorage.setItem('token', response.data.accessToken)
      localStorage.setItem('role', response.data.mySeller.role)
      localStorage.setItem('companyName', response.data.mySeller.companyName)
      setTimeout(()=>{
        window.location.href='/my-profile'
      }, 3000)
    } catch (error) {
      setErrorM(error.response.data.message);
    }
  };

  return (
    <div>
      <Form onSubmit={registerSubmit}>
        <FormGroup>
          <Label for="companyName" hidden>
            Nombre de la empresa
          </Label>
          <Input
            id="companyName"
            name="companyName"
            value={user.companyName}
            placeholder="Escribe el nombre de tu empresa"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="email" hidden>
            Correo
          </Label>
          <Input
            id="email"
            name="email"
            value={user.email}
            placeholder="Escribe tu correo"
            type="email"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="password" hidden>
            Contraseña
          </Label>
          <Input
            id="password"
            name="password"
            value={user.password}
            placeholder="Escribe tu contraseña"
            type="password"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="address" hidden>
            Dirección
          </Label>
          <Input
            id="address"
            name="address"
            value={user.address}
            placeholder="Escribe tu dirección"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="postCode" hidden>
            Código postal
          </Label>
          <Input
            id="postCode"
            name="postCode"
            value={user.postCode}
            placeholder="Escribe tu código postal"
            type="number"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="contactNumber" hidden>
            Número de contacto
          </Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            value={user.contactNumber}
            placeholder="Escribe tu numero de contacto"
            type="number"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <Button>Enviar</Button>
      </Form>
      <div
        className="alert alert-primary"
        role="alert"
        style={{ display: successM ? "block" : "none" }}
      >
        {successM}
      </div>
      <div
        className="alert alert-danger"
        role="alert"
        style={{ display: errorM ? "block" : "none" }}
      >
        {errorM}
      </div>
    </div>
  );
};

export default RegisterSeller;

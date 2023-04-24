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
    <div className="main-container">
      <h2 className='saludo-home'>REGISTRO DE EMPRESA</h2>
        <div className='texto-centrado'>
        <p className='texto-secundario'>Por favor ingresa los datos de tu empresa</p></div>
      <Form className="input" onSubmit={registerSubmit}>
      <div className="input">
        <FormGroup className="input">
          <Label for="companyName" className="label">Nombre de la empresa*
          </Label>
          <Input
            id="companyName"
            name="companyName"
            value={user.companyName}
            placeholder="Escribe el nombre de tu empresa"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}</div>
        <div className="input">
        <FormGroup>
          <Label for="email" className="label">
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
        </div>
        
        <FormGroup>
          <Label for="password" className="label">
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
          <Label for="address" className="label">
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
          <Label for="postCode" className="label">
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
          <Label for="contactNumber" className="label">
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
        <Button>Cancelar</Button>
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

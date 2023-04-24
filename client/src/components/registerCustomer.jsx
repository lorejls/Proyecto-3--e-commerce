import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import {Link} from 'react-router-dom'

// Instalar dependencia axios para hacer la llamada al back-end (npm i axios)

const RegisterCustomer = () => {
  // este es el estado inicial del user
  const [user, setUser] = useState({
    // esto hace que cada vez que inicio el login los campos del input indicados están vacíos listos para ingresar los datos
    name: "",
    surname: "",
    email: "",
    password: "",
    address: "",
    shippingAddress: "",
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
  const registerSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        { ...user }
      );
      console.log(response.data);
      setSuccessM(response.data.message);
      localStorage.setItem('token', response.data.accessToken)
      localStorage.setItem('role', response.data.myUser.role)
      localStorage.setItem('name', response.data.myUser.name)
      setTimeout(()=>{
        window.location.href='/my-profile'
      }, 3000)


    } catch (error) {
      setErrorM(error.response.data.message);
    }
  };

  return (
    <div className="main-container">
      <h2 className='saludo-home'>REGISTRO DE COMPRADOR</h2>
        <div className='texto-centrado'>
        <p className='texto-secundario'>Por favor ingresa tus datos</p></div>
        <Form className="input" onSubmit={registerSubmit}>
      <div className="input">
        <FormGroup className="input">
          <Label for="name" className="label">Nombre*
          </Label>
          <Input
            id="name"
            name="name"
            value={user.name}
            placeholder="Escribe tu nombre"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}</div>
        <div className="input">
        <FormGroup className="input">
          <Label for="surname" className="label">Apellido*
          </Label>
          <Input
            id="surname"
            name="surname"
            value={user.surname}
            placeholder="Escribe tu apellido"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}</div>
        <div className="input">
        <FormGroup className="input">
          <Label for="email" className="label">Email*
          </Label>
          <Input
            id="email"
            name="email"
            value={user.email}
            placeholder="Escribe tu email"
            type="email"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}</div>
        <div className="input">
        <FormGroup className="input">
          <Label for="password" className="label">Contraseña*
          </Label>
          <Input
            id="password"
            name="password"
            value={user.password}
            placeholder="Escribe tu contraseña"
            type="password"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}</div>
        <div className="input">
        <FormGroup className="input">
          <Label for="address" className="label">Drección*
          </Label>
          <Input
            id="address"
            name="address"
            value={user.address}
            placeholder="Escribe tu contraseña"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}</div>
        <div className="input">
        <FormGroup className="input">
          <Label for="shippingAddress" className="label">Drección de envíos*
          </Label>
          <Input
            id="shippingAddress"
            name="shippingAddress"
            value={user.shippingAddress}
            placeholder="Escribe tu contraseña"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}</div>
        <div className="input">
        <FormGroup className="input">
          <Label for="postCode" className="label">Código postal*
          </Label>
          <Input
            id="postCode"
            name="postCode"
            value={user.postCode}
            placeholder="Escribe tu código postal"
            type="number"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}</div>
        <div className="input">
        <FormGroup className="input">
          <Label for="contactNumber" className="label">Número de contacto*
          </Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            value={user.contactNumber}
            placeholder="Escribe tu número de contacto"
            type="number"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}</div>
        <div className="botones">
        <button className='button violet'>Aceptar</button>
        <Link to={'/register'}><button className='button white'>Cancelar</button></Link></div>
      </Form>
      {/* <div
        className="alert alert-primary"
        role="alert"
        style={{ display: successM ? "block" : "none" }}
      >
        {successM}
      </div> */}
      <div
        className="alert dark"
        role="alert"
        style={{ display: errorM ? "block" : "none" }}
      >
        {errorM}
      </div>
    </div>
  );
};

export default RegisterCustomer;

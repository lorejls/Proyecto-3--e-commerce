import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const ModifyProfile = () => {
  const [user, setUser] = useState({
    image: "",
    name: "",
    surname: "",
    companyName: "",
    address: "",
    shippingAddress: "",
    postCode: "",
    contactNumber: "",
    password: "",
  });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/api/user_profile", {
      headers: {
        Authorization: token,
      },
    });
    console.log(response)
    setUser(response.data.user);
  };
  
  useEffect(() => {
    getUser();
  }, []);
  const modifyProfSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user",
        { ...user },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response);
      setTimeout(() => {
        window.location.href = "/my-profile";
      }, 2000);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    modifyProfSubmit();
  }, []);

  return (
    <div className="main-container">
        {role == 0 && (
      <Form onSubmit={modifyProfSubmit}>
        <FormGroup>
          <Label for="image" hidden>
            Selecciona una imagen
          </Label>
          <Input
            id="userImage"
            name="image"
            value={user.image}
            placeholder="Selecciona una imagen"
            type="file"
            onChange={onChangeInput}
          ></Input>
        </FormGroup>{" "}
        <FormGroup>
          <Label for="name" hidden>
            Nombre
          </Label>
          <Input
            id="productTitle"
            name="name"
            value={user.name}
            placeholder="Escribe tu nombre"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="surname" hidden>
            Apellido
          </Label>
          <Input
            id="surname"
            name="surname"
            value={user.surname}
            placeholder="Escribe tu apellido"
            type="text"
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
            placeholder="Escribe tu nueva contraseña"
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
          <Label for="shippingAddress" hidden>
            Dirección de envíos
          </Label>
          <Input
            id="shippingAddress"
            name="shippingAddress"
            value={user.shippingAddress}
            placeholder="Escribe tu dirección de envíos"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="postCode" hidden>
            Dirección
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
        <Link to={'/my-profile'}><Button>Cancelar</Button></Link>
        <Button>Aceptar</Button>
      </Form>
        )}
        {role == 1 && (
            <Form onSubmit={modifyProfSubmit}>
                <FormGroup>
                <Label for="image" hidden>
            Selecciona una imagen
          </Label>
          <Input
            id="userImage"
            name="image"
            value={user.image}
            placeholder="Selecciona una imagen"
            type="file"
            onChange={onChangeInput}
          ></Input>
        </FormGroup>{" "}
            <FormGroup>
            <Label for="companyName" hidden>
              Nombre de la empresa
            </Label>
            <Input
              id="companyName"
              name="companyName"
              value={user.companyName}
              placeholder="Escribe el nombre de la empresa"
              type="string"
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
            placeholder="Escribe tu nueva contraseña"
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
            Dirección
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
          <Link to={'/my-profile'}><Button>Cancelar</Button></Link>
                  <Button>Aceptar</Button>
                  </Form>
        )}
    </div>
  );
};

export default ModifyProfile;

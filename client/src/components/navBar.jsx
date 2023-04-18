import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo1 from "./img/LOGO-white.png";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const HeaderNav = () => {
  const [role, setRole] = useState(null);
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // setItem : se utiliza para definir valores
  // getItem : se utiliza para obtener esos valores previmente definidos en la función anterior como por ejemplo un nombre, apellido, etc
  // removeItem : se utiliza para borrar valores de la memoria, ejemplo cuando hacemos el logout

  const name = localStorage.getItem("name");
  const companyName = localStorage.getItem("companyName");

  return (
    <div>
      {role == 0 && (
        <Navbar className="navbar">
          <Container>
            <Navbar.Brand href="#home">
              <img src={Logo1} alt="logo mercat" />
            </Navbar.Brand>
            <Nav className="nav">
              <Nav.Link href="#home">NOSOTROS</Nav.Link>
              <Nav.Link href="#features">PRODUCTOS</Nav.Link>
              <Nav.Link href="#pricing">CONTACTO</Nav.Link>
              <Navbar.Brand href="#">Hola,usuario {name}</Navbar.Brand>
            </Nav>
          </Container>
        </Navbar>
      )}
      {role == 1 && (
        <Navbar expand="lg" className="navbar">
          <Container>
            <Navbar.Brand href="my-home">
              <img src={Logo1} alt="logo mercat" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/my-profile">MI PERFIL</Nav.Link>
                <Nav.Link href="/my-products">MIS PRODUCTOS</Nav.Link>
                <Nav.Link href="#pricing">CONTACTO</Nav.Link>
                <NavDropdown
                  className="submenu"
                  title="IDIOMA"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">
                    CASTELLANO
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">INGLÉS</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="#deets">SALIR</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      {role == 2 && (
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Navbar.Brand href="#">Hola,admin {name}</Navbar.Brand>
          </Container>
        </Navbar>
      )}
      {role == null && (
        <Navbar className="navbar">
          <Container>
            <Navbar.Brand href="#home">
              <Link to={"/home"}>
                <img src={Logo1} alt="logo mercat" />
              </Link>
            </Navbar.Brand>
            <Nav className="nav">
              <Nav.Link href="#home">NOSOTROS</Nav.Link>
              <Nav.Link href="#features">
                <Link to={"/productos"}>PRODUCTOS</Link>
              </Nav.Link>
              <Nav.Link href="#pricing">CONTACTO</Nav.Link>
              <Button variant="dark">
                <Link to={"/login"}>INGRESAR</Link>
              </Button>
            </Nav>
          </Container>
        </Navbar>
      )}
    </div>
  );
};

export default HeaderNav;

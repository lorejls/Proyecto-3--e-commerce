import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo1 from "./img/LOGO-white.png";
import { BsArrowBarRight } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

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
    <div className="App">
      {role == 0 && (
        <Navbar expand="lg" className="navbar">
          <Container>
            <Navbar.Brand href="my-home">
              <img src={Logo1} alt="logo mercat" />
            </Navbar.Brand>
            <Nav.Link href="/cart">
            <FiShoppingCart className="icon-white" />
            </Nav.Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="text-white" href="/my-profile">
                  MI PERFIL
                </Nav.Link>
                <Nav.Link className="text-white" href="/productos">
                  PRODUCTOS
                </Nav.Link>
                <Nav.Link className="text-white" href="#pricing">
                  FAQ
                </Nav.Link>
                <Nav.Link className="text-white" href="#pricing">
                  CONTACTO
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link className="text-white" href="/logout">
                  SALIR <BsArrowBarRight />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
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
                <Nav.Link className="text-white" href="/my-profile">
                  MI PERFIL
                </Nav.Link>
                <Nav.Link className="text-white" href="/my-products">
                  MIS PRODUCTOS
                </Nav.Link>
                <Nav.Link className="text-white" href="#pricing">
                  FAQ
                </Nav.Link>
                <Nav.Link className="text-white" href="#pricing">
                  CONTACTO
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link className="text-white" href="/logout">
                  SALIR <BsArrowBarRight />
                </Nav.Link>
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
        <Navbar expand="lg" className="navbar">
          <Container>
            <Navbar.Brand href="/">
              <img src={Logo1} alt="logo mercat" />
            </Navbar.Brand>
            <Nav.Link href="/login">
            <FiShoppingCart className="icon-white" />
            </Nav.Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="text-white" href="/login">
                  INGRESAR
                </Nav.Link>
                <Nav.Link className="text-white" href="/">
                  NOSOTROS
                </Nav.Link>
                <Nav.Link className="text-white" href="/productos">
                  PRODUCTOS
                </Nav.Link>
                <Nav.Link className="text-white" href="/">
                  CONTACTO
                </Nav.Link>
                {/* <NavDropdown
                 className="submenu"
                 title="IDIOMA"
                 id="collasible-nav-dropdown">
                 <NavDropdown.Item href="#action/3.1">
                   CASTELLANO
                 </NavDropdown.Item>
                 <NavDropdown.Item href="#action/3.2">INGLÉS</NavDropdown.Item>
               </NavDropdown> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
};

export default HeaderNav;

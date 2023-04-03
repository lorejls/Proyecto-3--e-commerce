import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const HeaderNav = () =>{
    const [role, setRole] = useState(null)
    useEffect(()=>{
      const storedRole = localStorage.getItem('role')
      if(storedRole){
        setRole(storedRole)
      }
    }, []) 

  // setItem : se utiliza para definir valores 
      // getItem : se utiliza para obtener esos valores previmente definidos en la función anterior como por ejemplo un nombre, apellido, etc
      // removeItem : se utiliza para borrar valores de la memoria, ejemplo cuando hacemos el logout


      const name = localStorage.getItem('name')
      const companyName = localStorage.getItem('companyName')


  return(
    <div>
      {
        role == 0 && (
          <Navbar expand="lg" variant="light" bg="light">
              <Container>
                <Navbar.Brand href="#">Hola, comprador {name}</Navbar.Brand>
              </Container>
            </Navbar>
        )
      }
    {
    role == 1 && (
    <Navbar expand="lg" variant="light" bg="light">
              <Container>
                <Navbar.Brand href="#">Hola,vendedor {companyName}</Navbar.Brand>
             </Container>
             </Navbar>
    )
  }
  {
    role == 2 && (
      <Navbar expand="lg" variant="light" bg="light">
              <Container>
                <Navbar.Brand href="#">Hola,admin {name}</Navbar.Brand>
              </Container>
            </Navbar>
    )
  }
  {
    role === null && (
      <Navbar expand="lg" variant="light" bg="light">
               <Container>
                 <Navbar.Brand href="#">Hola, no estás logeado</Navbar.Brand>
               </Container>
             </Navbar>
    )
  }
    
    </div>);
}



export default HeaderNav;
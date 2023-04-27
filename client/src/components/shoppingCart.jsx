import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FOTO from "../components/img/fyv.jpg";
import Card from "react-bootstrap/Card";
import {BsTrashFill} from "react-icons/bs";
import { wrapper } from 'axios-cookiejar-support';
import Cookie from 'tough-cookie';

const cookieJar = new Cookie.CookieJar();

const ShoppingCart = () => {
  const token = localStorage.getItem('token');
  const [message, setMessage] = useState (null)
  const [cart, setCart] = useState([]);

  const axiosWithCookies = wrapper(axios.create({
    jar: cookieJar,
    withCredentials: true
  }));

  const getCart = async () => {
    // console.log()
    const response = await axiosWithCookies.get('http://localhost:5000/api/cart', {
      headers: {
        Authorization: token
        
      }
    });
    console.log(response);
    setCart(response.data.cart)
  };


  const deleteProduct = async (productId) => {
    console.log(productId);
    // localStorage.setItem('producto',productId)
    let option = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (option == true) {
      try {
        const response = await axiosWithCookies.delete(
          'http://localhost:5000/api/cart',
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        // localStorage.removeItem('producto')
        setTimeout(() => {
          window.location.href = "/cart";
        }, 2000);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const handlePayment = async() =>{
    try {
      console.log(token)
    const response = await axiosWithCookies.post("http://localhost:5000/api/checkout",{...cart}, {
        headers:{
            Authorization:token
        },
        
    })

    console.log(response)
    setMessage(response.data.message)
    setTimeout(()=>{
        window.location.href="/productos" 
    },3000)
    
    } catch (error) {
      console.log(error.response)
    }
  }
  // const addToCart = async (productId, valor) => {
  //   const response = await axiosWithCookies.post(
  //     'http://localhost:5000/api/cart',
  //     { productId, valor },
  //     {
  //       headers: {
  //         Authorization: token
  //       }
  //     }
  //   );
  //   console.log(response);
  //   setCart(response.data.cart);
  //   // localStorage.setItem("cartId", response.data.newCart._id)
  // };

  useEffect(() => {
    getCart();
  }, []);

  const total = cart.reduce((acc, obj) => acc + obj.total, 0);

  return (
    <div className="main-container">
      {cart.map((producto) => {
        return (
          <div key={producto._id}>
          {console.log(producto._id)}
          <Link className="link" key={producto._id}>
            <Card className="margin-bottom text-card" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={FOTO} />
              <Card.Body>
                <Card.Title>Producto: {producto.name}</Card.Title>
                <Card.Text>Cantidad: {producto.quantity} kg</Card.Text>
                <Card.Text>Precio: € {producto.price} /kg</Card.Text>
                <div>
                <button className="button narrow red"
                  onClick={() => {
                    deleteProduct(producto._id);
                  }}
                ><BsTrashFill/>
                </button>
                  <button className="button black narrow">
                    + 1kg
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </div>
              // <div className="card">
              //   <h2>Nombre: {producto.name}</h2>
              //   <h3>Precio: €/kg {producto.price}</h3>
              //   <h3>Cantidad: {producto.quantity} kg</h3>
              // </div>

        );
      })}
      <Card.Title>Total: {total} €</Card.Title>
          <div className="botones">
          <button className='button black' onClick={handlePayment} >Pagar</button>
        <Link to={'/productos'}><button className='button white'>Cancelar</button></Link></div>
          {/* // <button onClick={handlePayment}>
          //   Pagar
          //   </button> */}
            <div style={{display: message ? 'block' : 'none'}}>{message}</div>
    </div>
  );
};

export default ShoppingCart;
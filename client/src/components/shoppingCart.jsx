import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
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
        window.location.href="/my-profile" 
    },3000)
    
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  const total = cart.reduce((acc, obj) => acc + obj.total, 0);

  return (
    <div className="main-container">
      {cart.map((producto) => {
        return (
            <div>
            <Link key={producto._id}>
            <p>Nombre: {producto.name}</p>
            <p>Precio: €/kg {producto.price}</p>
            {/* <p>Description: {producto.description}</p> */}
            <p>Cantidad: {producto.quantity} kg</p>
            <Link to={`/product/${producto._id}`}>
            <Button>Ver producto</Button>
            </Link>
          </Link>
          </div>
        );
      })}
          <p>Total: {total} €</p>
          <button onClick={handlePayment}>
            Pagar
            </button>
            <div style={{display: message ? 'block' : 'none'}}>{message}</div>
    </div>
  );
};

export default ShoppingCart;
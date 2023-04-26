import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import FOTO from "../components/img/fyv.jpg";
import { wrapper } from 'axios-cookiejar-support';
import Cookie from 'tough-cookie';
import {Input} from "reactstrap";


const cookieJar = new Cookie.CookieJar();

const Products = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  // const role = localStorage.getItem('role');
  const [filtro, setFiltro] = useState("");
  const [cart, setCart] = useState([]);

  const axiosWithCookies = wrapper(axios.create({
    jar: cookieJar,
    withCredentials: true
  }));

  // const getProducts = async () => {
  //   const response = await axios.get("http://localhost:5000/api/products");
  //   console.log(response);
  //   setProducts(response.data.product);
  // };

  const getProducts = async () => {
    const response = await axiosWithCookies.get('http://localhost:5000/api/products');
    console.log(response.data);
    setProducts(response.data.product);
  };

  const addToCart = async (productId, valor) => {
    const response = await axiosWithCookies.post(
      'http://localhost:5000/api/cart',
      { productId, valor },
      {
        headers: {
          Authorization: token
        }
      }
    );
    console.log(response);
    setCart(response.data.cart);
    // localStorage.setItem("cartId", response.data.newCart._id)
  };

  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);

  // filtrado de productos por categoría y vendedor. Aplico el método filter
  const filtredProducts = products.filter((producto) => {
    if (producto.title.toLowerCase().includes(filtro.toLowerCase())) {
      return true;
    }
  });

  // const filtredProducts = () => {
  //   return products.filter(
  //     (product) =>
  //       product.title.toLowerCase().includes(filtro.toLowerCase()) ||
  //       product.category.toLowerCase().includes(filtro.toLowerCase()) ||
  //       product.price.toString().toLowerCase().includes(filtro.toLocaleLowerCase())
  //   );
  // };
  return (
    <div className="main-container">
      <div className="search">
      <Input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            Placeholder='Buscar...'
            
          /></div>
      {filtredProducts.map((productos) => {
        return (
          <div key={productos._id}>
            <Link className="link" key={productos._id}>
              <Card className="margin-bottom text-card" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={FOTO} />
                <Card.Body>
                  <Card.Title>{productos.title}</Card.Title>
                  <Card.Text>{productos.description}</Card.Text>
                  <Card.Text>Precio: € {productos.price}/kg</Card.Text>
                  <Card.Text>Stock disponible: {productos.stock} kg</Card.Text>
                  <button className="button black" onClick={() => addToCart(productos._id, productos.valor)}>Agregar al carrito</button>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Products;

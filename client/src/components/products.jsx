import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FOTO from "../components/img/fyv.jpg";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtro, setFiltro] = useState("");

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/api/products");
    console.log(response);
    setProducts(response.data.product);
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
      <input
        type="text"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      {filtredProducts.map((productos) => {
        return (
          <div className="main-container">
            <Link key={productos._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={FOTO} />
                <Card.Body>
                  <Card.Title>{productos.title}</Card.Title>
                  <Card.Text>{productos.description}</Card.Text>
                  <h3 className="link">€/kg: {productos.price}</h3>
                  <button className="button black">Agregar al carrito</button>
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

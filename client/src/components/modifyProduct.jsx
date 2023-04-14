import React, { useState, useEffect } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";

const ModifyProduct = () => {
  const {productId} = useParams();
  const [products, setProducts] = useState({});
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const getProduct = async () => {
    const response = await axios.get(`http://localhost:5000/api/product/${productId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
    setProducts(response.data.product);
  };
console.log(productId)
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      {/* <h2>Mis productos</h2>
              
              <h1>{misProductos.title}</h1>
              <h3>{misProductos.description}</h3>
              <h3>{misProductos.price}</h3>
              <h3>{misProductos.stock}</h3> */}
           
    </div>
  )
};

export default ModifyProduct;

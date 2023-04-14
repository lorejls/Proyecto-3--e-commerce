import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useParams } from "react-router-dom";
import { Button } from "reactstrap";

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const token = localStorage.getItem("token");

  const getMyProducts = async () => {
    const response = await axios.get("http://localhost:5000/api/user_profile", {
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    setMyProducts(response.data.user.myProducts);
  };

  useEffect(() => {
    getMyProducts();
  }, []);

  console.log(myProducts);

  const deleteProduct = async (productId)=>{
    console.log(productId)
    // localStorage.setItem('producto',productId)
    let option = window.confirm('¿Seguro que deseas eliminar este producto?')
    if(option == true){
      try {
        const response = await axios.delete(`http://localhost:5000/api/product/${productId}`, {
          headers: {
            Authorization: token,
          }
        })
        console.log(response)
        // localStorage.removeItem('producto')
        setTimeout(()=>{
          window.location.href = '/my-products'
        }, 2000)
      } catch (error) {
        console.log(error.response)
      }
  }
  }     
  
  return (
    <div>
      <h2>Mis productos</h2>
      <Button className="btn btn-dark">
        <Link to={"/new-products"}>Nuevo producto</Link>
      </Button>
      {myProducts.map((misProductos) => {
        return (
          <div>
            {console.log(misProductos._id)}
            <Link key={misProductos._id}>
              <h1>{misProductos.title}</h1>
              <h3>{misProductos.description}</h3>
              <h3>{misProductos.price}</h3>
              <h3>{misProductos.stock}</h3>
                <Link to={`/modify-product/${misProductos._id}`}><Button className="btn btn-primary" >
                  Modificar producto</Button>
                </Link>
              <Button className="btn btn-danger" onClick={()=>{deleteProduct(misProductos._id)}}>Eliminar producto</Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};


export default MyProducts;

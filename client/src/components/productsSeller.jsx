import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
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
    console.log(response)
    setMyProducts(response.data.user.myProducts);
  };

  useEffect(() => {
    getMyProducts();
  }, []);

  console.log(myProducts);

  return (
    <div>
      <h2>Mis productos</h2>
      <Button className="btn btn-dark"><Link to={'/new-products'}>Nuevo producto</Link></Button>
      {
        myProducts.map((misProductos)=>{
          return(
            <div>
              <Link key={misProductos._id}>
              <h1>{misProductos.title}</h1>
              <h3>{misProductos.description}</h3>
              <h3>{misProductos.price}</h3>
              <h3>{misProductos.stock}</h3>
              <Button className="btn btn-primary"><Link to={`/modify-product/${misProductos._id}`}>Modificar producto</Link></Button>
              <Button className="btn btn-danger"><Link to={'/delete-product'}>Eliminar producto</Link></Button>
              </Link>
            </div>
            )
        })
      }
    </div>
  )
}


export default MyProducts
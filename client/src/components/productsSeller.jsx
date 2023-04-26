import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import FOTO from "../components/img/fyv.jpg";
import Card from "react-bootstrap/Card";
import {FaPlus} from "react-icons/fa";
import {BsTrashFill} from "react-icons/bs"

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

  const deleteProduct = async (productId) => {
    console.log(productId);
    // localStorage.setItem('producto',productId)
    let option = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (option == true) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/product/${productId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        // localStorage.removeItem('producto')
        setTimeout(() => {
          window.location.href = "/my-products";
        }, 2000);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <div className="main-container">
      <h2 className="saludo-home">Mis productos</h2>
      <div className="right margin-bottom">
      <button className="button white">
        <Link  to={"/new-products"} className="link" > <FaPlus className="color"/>     Nuevo producto</Link>
      </button></div>
      {myProducts.map((misProductos) => {
        return (
          <div>
            {console.log(misProductos._id)}
            <Link className="link" key={misProductos._id}>
              <Card className="margin-bottom text-card" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={FOTO} />
                <Card.Body>
                  <Card.Title>{misProductos.title}</Card.Title>
                  <Card.Text>{misProductos.description}</Card.Text>
                  <Card.Text>Precio: € {misProductos.price} /kg</Card.Text>
                  <Card.Text>Stock disponible: {misProductos.stock} kg</Card.Text>
                  <div>
                  <button className="button narrow red"
                    onClick={() => {
                      deleteProduct(misProductos._id);
                    }}
                  ><BsTrashFill/>
                  </button>
                  <Link to={`/modify-product/${misProductos._id}`}>
                    <button className="button black narrow">
                      Modificar
                    </button>
                  </Link>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MyProducts;

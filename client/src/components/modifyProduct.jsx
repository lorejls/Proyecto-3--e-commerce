import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ModifyProduct = () => {
  const { productId } = useParams;
  const [products, setProducts] = useState({});
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const getProduct = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/product/${productId}`
    //   {
    //     headers: {
    //       Authorization: token,
    //     },
    //   }
    );
    console.log(response);
    // setProducts(response.data.user.myProducts);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return <div>modifyProduct</div>;
};

export default ModifyProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const ModifyProduct = () => {
  const {productId} = useParams();
  const [product, setProduct] = useState({
    image:'',
    title:'',
    description:'',
    price:'',
    category:''
  });

  const token = localStorage.getItem("token");

const onChangeInput = (e) =>{
        const {name, value} = e.target
        setProduct ({...product, [name]: value})
        console.log(product)
    }

  const getProduct = async()=>{
    const response = await axios.get(`http://localhost:5000/api/product/${productId}`)
    setProduct(response.data.product)
  }
  useEffect(() => {
    getProduct();
  }, []);
  const modifySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/product/${productId}`, {...product}, {
        headers: {
          Authorization: token,
        },
      })

    console.log(response);
    setTimeout(()=>{
      window.location.href = '/my-products'
    }, 2000)
    } catch (error) {
      console.log(error.response);
    }
   
    
    

    // setProduct(response.data.product);
  };
console.log(productId)
  useEffect(() => {
    modifySubmit();
  }, []);

  return (
    <div>
     <Form onSubmit={modifySubmit}>
        <FormGroup>
          <Label for="image" hidden>
            Selecciona una imagen
          </Label>
          <Input
            id="productImage"
            name="image"
            value={product.image}
            placeholder="Selecciona una imagen"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="title" hidden>
            Título
          </Label>
          <Input
            id="productTitle"
            name="title"
            value={product.title}
            placeholder="Describe tu producto"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="description" hidden>
            Descripción
          </Label>
          <Input
            id="productDescription"
            name="description"
            value={product.description}
            placeholder="Describe tu producto"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="price" hidden>
            Precio
          </Label>
          <Input
            id="productPrice"
            name="price"
            value={product.price}
            placeholder="Ingresa el precio"
            type="number"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="stock" hidden>
            Stock disponible
          </Label>
          <Input
            id="productPrice"
            name="stock"
            value={product.stock}
            placeholder="Ingresa el stock disponible"
            type="number"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup check>
          <Label>Categoría:</Label>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="category"
                value='verdura'
                onChange={onChangeInput}
              />
              {" "}
              Verdura
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="category"
                value='fruta'
                onChange={onChangeInput}
              />
              {" "}
              Fruta
            </Label>
          </FormGroup>
        </FormGroup>
        <Link to={'/my-products'}><Button>Cancelar</Button></Link>
        <Button>Aceptar</Button>
        </Form>
    </div>
  )
};

export default ModifyProduct;

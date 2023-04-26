import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input} from "reactstrap";

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
    <div className="main-container">
     <Form onSubmit={modifySubmit} className="input top">
        <FormGroup className="input">
          <Label for="image" className="label">
            Imagen
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
        <FormGroup className="input">
          <Label for="title" className="label">
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
        <FormGroup className="input">
          <Label for="description" className="label">
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
        <FormGroup className="input">
          <Label for="price" className="label">
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
        <FormGroup className="input">
          <Label for="stock" className="label">
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
        <FormGroup className="input" check>
          <Label className="label left">Categoría* :</Label>
          <div className="radio">
          <FormGroup className="input" check>
            <Label className="label"check>
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
          <FormGroup className="input" check>
            <Label className="label" check>
              <Input
                type="radio"
                name="category"
                value='fruta'
                onChange={onChangeInput}
              />
              {" "}
              Fruta
            </Label>
          </FormGroup></div>
        </FormGroup>
        <div className="botones">
        <button className='button black'>Aceptar</button>
        <Link to={'/my-products'}><button className='button white'>Cancelar</button></Link>
        </div>
        </Form>
        
    </div>
  )
};

export default ModifyProduct;

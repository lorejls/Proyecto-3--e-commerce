import React, {useState} from 'react';
import { Form, FormGroup, Label, Input} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";




const NewProduct=()=> {

    const [product, setProduct] = useState({
        image: '',
        title: '',
        description: '',
        price:'',
        stock:'',
        category: ''
    });

    const token = localStorage.getItem('token')

    const [successM, setSuccessM] = useState(null);
    const [errorM, setErrorM] = useState(null);

    const onChangeInput = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
      console.log(product);
    };

    const productSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:5000/api/product",{...product},{
          headers:{
            Authorization: token
          }
        }
        );
        console.log(response.data);
        setSuccessM(response.data.message);

        setTimeout(() => {
          window.location.href = "/my-products";
        }, 2000);
      } catch (error) {
        setErrorM(error.response.data.message);
      }
    };

  return (
    <div className="main-container">
    <Form onSubmit={productSubmit} className="input top">
        <FormGroup className="input">
          <Label for="image" className="label">
            Imagen*
          </Label>
          <Input
            id="productImage"
            name="image"
            value={product.image}
            placeholder="Selecciona una imagen"
            type="file"
            onChange={onChangeInput}
          ></Input>
        </FormGroup>{" "}
        <FormGroup className="input">
          <Label for="title" className="label">
            Nombre*
          </Label>
          <Input
            id="productTitle"
            name="title"
            value={product.title}
            placeholder="Nombre del producto"
            type="text"
            onChange={onChangeInput}
          />
        </FormGroup>{" "}
        <FormGroup className="input">
          <Label for="description" className="label">
            Descripción*
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
            Precio €/kg*
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
            Stock disponible kg*
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
        <Link to={'/my-home'}><button className='button white'>Cancelar</button></Link>
        </div>
        {/* <Button>Aceptar</Button> */}
        </Form>
        <div
        className="alert dark"
        role="alert"
        style={{ display: successM ? "block" : "none" }}
      >
        {successM}
      </div>
      <div
        className="alert alert-danger"
        role="alert"
        style={{ display: errorM ? "block" : "none" }}
      >
        {errorM}
      </div>
    </div>
  );
};

export default NewProduct
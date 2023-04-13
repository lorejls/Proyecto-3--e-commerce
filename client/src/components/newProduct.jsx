import React, {useState} from 'react';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";


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
    <div>
    <Form onSubmit={productSubmit}>
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
        <Button>Aceptar</Button>
        </Form>
        <div
        className="alert alert-primary"
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
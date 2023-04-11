import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'


const Products =() =>{
    const [products, setProducts] = useState([]);

    const getProducts =async()=>{
        const response = await axios.get('http://localhost:5000/api/products')
        console.log(response)
        setProducts(response.data.product)
    }

    useEffect(()=>{
        getProducts()
    },[])
    console.log(products)
    

  return (
    <div>
      <h2>Productos destacados</h2>
      {
        products.map((productos)=>{
          return(
            <div>
              <Link key={productos._id}>
              <h1>{productos.title}</h1>
              <h3>{productos.description}</h3>
              <h3>{productos.price}</h3>
              </Link>
            </div>
            )
        })
      }
      


    </div>
  )
}

export default Products
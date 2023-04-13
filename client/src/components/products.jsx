import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'


const Products =() =>{
    const [products, setProducts] = useState([]);
    const [filtro, setFiltro] = useState('');


    const getProducts =async()=>{
        const response = await axios.get('http://localhost:5000/api/products')
        console.log(response)
        setProducts(response.data.product)
    }

    useEffect(()=>{
        getProducts()
    },[])
    console.log(products)

      // filtrado de productos por categoría y vendedor. Aplico el método filter
  const filtredProducts = products.filter(producto=>{
  if(producto.title.toLowerCase().includes(filtro.toLowerCase())){
      return true
  }
})

// const filtredProducts = () => {
//   return products.filter(
//     (product) =>
//       product.title.toLowerCase().includes(filtro.toLowerCase()) ||
//       product.category.toLowerCase().includes(filtro.toLowerCase()) ||
//       product.price.toString().toLowerCase().includes(filtro.toLocaleLowerCase())
//   );
// };
  return (
    <div>
        <input type="text" value={filtro} onChange={e=> setFiltro(e.target.value)}/>

      <h2>Productos destacados</h2>
      {
        filtredProducts.map((productos)=>{
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
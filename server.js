
// Import Dependencies
const express= require('express') //importamos express
const app= express() //creamos un servidor que se llama app y utiliza las funciones/metodos de la dependencia express
const cors = require('cors')

// Install DOTENV and MONGOOSE dependencies
const mongoose = require('mongoose')
require('dotenv').config()


app.use(express.json({extended:true})) //para poder escribir los datos en formato JSON y utilizarlos en el postman
app.use(express.urlencoded({extended:true})) //para poder recibir datos en formato URL
app.use(cors())
// importamos enrutamiento
const UserRouter = require('./routes/UserRouter')
const ProductRouter = require('./routes/ProductRouter')
const PayRouter = require('./routes/PayRouter')

// utilizo los enrutamientos en el servidor
app.use('/api', UserRouter)
app.use('/api', ProductRouter)
app.use ('/api', PayRouter)
// importamos cors para que el servidor pueda ser accedido desde cualquier lugar


// CONEXIÓN A DB
const URL = process.env.MONGO_URL
mongoose.connect(URL, {}).then(()=>{
    console.log('Your DB is now connected')
}).catch((error)=>{
    console.log(error)
})


// responde server when is connected
app.listen(5000, ()=>{
    console.log('puerto 5000')
})

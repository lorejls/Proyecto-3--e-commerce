
// Import Dependencies
const express= require('express') //importamos express
const app= express() //creamos un servidor que se llama app y utiliza las funciones/metodos de la dependencia express
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Install DOTENV and MONGOOSE dependencies
const mongoose = require('mongoose')
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
app.use(bodyParser.json()); // antiguamente app.use(express.json())
app.use(cookieParser());
// importamos enrutamiento
const UserRouter = require('./routes/UserRouter')
const ProductRouter = require('./routes/ProductRouter')
const CartRouter = require('./routes/CartRouter')
const OrderRouter = require('./routes/OrderRouter')

// utilizo los enrutamientos en el servidor
app.use('/api', UserRouter)
app.use('/api', ProductRouter)
app.use ('/api', OrderRouter)
app.use ('/api', CartRouter)
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

const express = require('express')
const ProductRouter = express.Router()
const Product = require('../models/Product')
const User = require('../models/User')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const authSeller = require('../middleware/authSeller')


// Creo un producto 
// POST

ProductRouter.post('/product',auth, authSeller, async (req,res)=>{
    const {image, title, description, price, stock} = req.body
    try {
        // condición de validación
        if(!image ||!title ||!description ||!price ||!stock){
            return res.status(400).send({
                success:false,
                message: 'No has ingresado todos los campos'
        })
    }
    let myProduct = new Product({
        image,
        title,
        description,
        price,
        stock
    })

    await User.findByIdAndUpdate(req.user.id,{
        $push:{
            myProducts:myProduct._id
        }
    })
        await myProduct.save()

        return res.status(200).send({
            success:true,
            message: 'Has creado el producto con éxito',
            myProduct
        })


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


// modificar un producto
// PUT
ProductRouter.put('/product', authSeller, authAdmin, async (req, res)=>{
    try {
        await Product.findById(req.user.id)
        const {title,
        description, price} =req.body

        if(!title || !description || !price) {
            return res.status(400).send({
                success: false,
                message: 'No has ingresado todos los campos'
        })
    }
    return res.status(200).send({
        success: true,
            message: 'Los datos han sido modificado correctamente',
    })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// elimino un producto
// DELETE
ProductRouter.delete('/product/:id',authAdmin, authSeller, async (req, res)=>{
    try {
        const {id}= id.params
        await Product. findByIdAndDelete(id)
        if(!id){
            return res.status(400).send({
                success:false,
                message: 'No hemos encontrado el producto seleccionado'
            })
        }

        return res.status(200).send({
            success:true,
            message: 'El producto ha sido borrado con éxito'
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


// GET de todos los productos
ProductRouter.get('/products', async (req, res) => {
    try {

        let product = await Product.find({}).select('title description price seller')

        if (!product) {
            return res.status(400).send({
                success: false,
                message: 'No hay productos para mostrar'
            })
        }
        // si encuentra al usuario en la DB
        return res.status(200).send({
            success: true,
            product
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// mostrar productos por vendedor
// GET
ProductRouter.get('/product_seller/:id', async (req, res) =>{
    try {
        const {id} = req.params
        let product_seller = await User.findById(req.seller.id).select('myProducts').populate('myProducts')

        if (!product_seller) {
            return res.status(400).send({
                success: false,
                message: 'No hay productos para mostrar'
            })
        }

        return res.status(200).send({
            success: true,
            product_seller
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


module.exports = ProductRouter
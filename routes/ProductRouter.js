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
    const {image, title, description, price, stock, category} = req.body
    try {
        // condición de validación
        if(!image ||!title ||!description ||!price ||!stock ||!category){
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
        stock,
        category
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
ProductRouter.put('/product/:id',auth, authSeller, async (req, res)=>{
    try {
        const {id}= req.params
        const {image, title, description, price, category, stock} =req.body

    //     if(!image|| !title || !description || !price|| !category || !stock) {
    //         return res.status(400).send({
    //             success: false,
    //             message: 'No has ingresado todos los campos'
    //     })
    // }
    const productos = await Product.findByIdAndUpdate(id,{image, title, description, price, category, stock})


    return res.status(200).send({
        success: true,
            message: 'Los datos han sido modificado correctamente',
            productos
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
ProductRouter.delete('/product/:id', auth, authSeller, async (req, res)=>{
    try {
        const {id}= req.params
        if(!id){
            return res.status(400).send({
                success:false,
                message: 'No hemos encontrado el producto seleccionado'
            })
        }
        await Product.findByIdAndDelete(id)
        

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



// GET de un producto
ProductRouter.get('/product/:id', async (req, res) => {
    try {
        const {id} = req.params
        let product = await Product.findById(id)

        if (!product) {
            return res.status(400).send({
                success: false,
                message: 'No hay producto para mostrar'
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
        let product_seller = await User.findById(id).select('myProducts').populate('myProducts')

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
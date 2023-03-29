const express = require('express')
const PayRouter = express.Router()
const Pay = require('../models/Pay')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


// Creo un pago y envío 
// POST

PayRouter.post('/pay',auth, authAdmin, async (req,res)=>{
    const {postCode, shippingAddress, payment} = req.body
    try {
        // condición de validación
        if(!postCode ||!shippingAddress ||!payment){
            return res.status(400).send({
                success:false,
                message: 'No has ingresado todos los campos'
        })
    }
    let myPay = new Pay({
        postCode,
        shippingAddress,
        payment,
    })

    await User.findByIdAndUpdate(req.user.id),{
        $push:{
            myPay:payHistory._id
        }
    }
        await myPay.save()
        
        return res.status(200).send({
            success:true,
            message: 'Tu pago ha sido exitoso',
            myPay
        })


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// GET de todos los pedidos anteriores
PayRouter.get('/pay',auth, authAdmin, async (req, res) => {
    try {
        let pay = await Pay.find({}).select('user address timestamps status')

        if (!pay) {
            return res.status(400).send({
                success: false,
                message: 'No encontramos pagos en la base de datos'
            })
        }

        return res.status(200).send({
            success: true,
            pay
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})



module.exports = PayRouter
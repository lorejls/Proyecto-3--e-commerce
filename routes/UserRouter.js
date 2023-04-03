const express = require('express')
const UserRouter = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

// Declaro las cantidadesde vueltas que quiero que de mi contraseña 
const salt = bcrypt.genSaltSync(10)

// declaro la función que me va a crear el token
const createToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: '7d'
    })
}

// Crear un ususario
// POST
UserRouter.post('/register', async (req, res) => {
    const {
        name,
        surname,
        email,
        address,
        shippingAddress,
        postCode,
        contactNumber,
        password
    } = req.body
    try {
        // compruebo si ya existe un usuario registrado en mi BD con el mismo mail
        let userFind = await User.findOne({
            email
        })
        if (userFind) {
            return res.status(400).send({
                success: false,
                message: 'Ya existe un usuario registrado con este correo'
            })
        }
        // condiciones de validación
        if (!name || !surname || !email || !password || !address || !shippingAddress || !postCode || !contactNumber ) {
            return res.status(400).send({
                success: false,
                message: 'No has ingresado todos los campos'
            })
        }

        // encripto la sontraseña (antes de crear el usuario)
        let passwordHash = bcrypt.hashSync(password, salt)

        // declaro un nuevo objeto
        let myUser = new User({
            name,
            surname,
            email,
            address,
            shippingAddress,
            postCode,
            contactNumber,
            password: passwordHash
        })

        await myUser.save()

        return res.status(200).send({
            success: true,
            message: 'Tu usuario ha sido creado con éxito',
            myUser
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// Crear un usuario
// POST
UserRouter.post('/register_seller', async (req, res) => {
    const {
        companyName,
        email,
        address,
        postCode,
        contactNumber,
        password
    } = req.body
    try {
        // compruebo si ya existe un usuario registrado en mi BD con el mismo mail
        let sellerFind = await User.findOne({
            email
        })
        if (sellerFind) {
            return res.status(400).send({
                success: false,
                message: 'Ya existe un vendedor registrado con este correo'
            })
        }
        // condiciones de validación
        if (!companyName || !address|| !email || !password || !contactNumber || !postCode) {
            return res.status(400).send({
                success: false,
                message: 'No has ingresado todos los campos'
            })
        }

        // encripto la sontraseña (antes de crear el usuario)
        let passwordHash = bcrypt.hashSync(password, salt)

        // declaro un nuevo objeto
        let mySeller = new User({
            companyName,
            email,
            address,
            postCode,
            contactNumber,
            role:1,
            password: passwordHash
        })

        await mySeller.save()

        return res.status(200).send({
            success: true,
            message: 'Tu usuario ha sido creado con éxito',
            mySeller
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


// GET de todos los usuarios
UserRouter.get('/users', auth, authAdmin, async (req, res) => {
    try {
        // busco dentro de mi colección User todos los usuarios
        // el método .find() de mongoose se utiliza para encontrar y devolver todos los usuarios
        // {} - se utilizan llaves vacías para que me devuelva todos los objetos de un ARRAY

        // let users = await User.find({}).select('name surname') - ssi solo quiero que me devuelva el nombre y apellido del usuario
        let users = await User.find({})
        // si no encuentra usuarios me devuelve el mensaje que yo le indico
        if (!users) {
            return res.status(400).send({
                success: false,
                message: 'No encontramos al usuario en la base de datos'
            })
        }
        // si encuentra al usuario en la DB
        return res.status(200).send({
            success: true,
            users
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// GET de todos los vendedores
UserRouter.get('/sellers', auth, authAdmin, async (req, res) => {
    try {
        let users = await User.find({})
        
        if (!users) {
            return res.status(400).send({
                success: false,
                message: 'No encontramos al usuario en la base de datos'
            })
        }

        let userFilter = users.filter((user) => user.role === 1)
        return res.status(200).send({
                    success: true,
                    userFilter
                })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// GET de todos los comrpadores
UserRouter.get('/customers', auth,authAdmin, async (req, res) => {
    try {
        let users = await User.find({})
        
        if (!users) {
            return res.status(400).send({
                success: false,
                message: 'No encontramos al usuario en la base de datos'
            })
        }

        let userFilter = users.filter((user) => user.role === 0)
        return res.status(200).send({
                    success: true,
                    userFilter
                })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})


// GET un solo usuario
UserRouter.get('/user', auth, authAdmin, async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select('name surname email')
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'No encontramos al usuario en la base de datos'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Usuario encontrado con éxito',
            user
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})



// LOGIN de Usuario/ Vendedor

UserRouter.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'Algo ha salido mal, vuelve a intentarlo (email)'
            })
        }

        const passwordOk = bcrypt.compareSync(password, user.password)
        if (!passwordOk) {
            return res.status(400).send({
                success: false,
                message: 'Algo ha salido mal, vuelve a intentarlo (password)'
            })
        }

        // genero el token del usuario
        const accessToken = createToken({
            id: user._id
        })

        return res.status(200).send({
            success: true,
            message: 'Has ingresado correctamente',
            user,
            accessToken //Imprescindible para que me haga el login correctamente, si no devuelve el token no podré utilizar la app en las rutas privadas
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

// Modifico datos del perfil logueado customer
// PUT
UserRouter.put('/user', auth, authAdmin, async (req, res)=>{
    try {
        await User.findById(req.user.id)
        const {address, shippingAddress,
            postCode,
            contactNumber} =req.body

        if(!address || !shippingAddress ||!postCode || !contactNumber) {
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

// Modifico datos del perfil logueado seller
// PUT
UserRouter.put('/seller', auth, authAdmin, async (req, res)=>{
    try {
        await User.findById(req.user.id)
        const {address,
            postCode,
            contactNumber} =req.body

        if(!address ||!postCode || !contactNumber) {
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

// elimino un usuario
// DELETE
UserRouter.delete('/user/:id', auth, authAdmin, async (req, res)=>{
    try {
        const {id}= req.params
        await User. findByIdAndDelete(id)
        if(!id){
            return res.status(400).send({
                success:false,
                message: 'No hemos encontrado este usario'
            })
        }

        return res.status(200).send({
            success:true,
            message: 'El usuario ha sido borrado con éxito'
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
})
module.exports = UserRouter
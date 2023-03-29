const User = require("../models/User")

const authSeller = async(req, res, next) =>{
    try {
        // busco el vendedor logueado por su id
        // que me viene devuelto en el req.user
        // me viene devuelto del token 
        const user = await User.findOne({
            _id: req.user.id
        })

    
        // si no encuentra el vendedor, devolvemos un error
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Vendedor no encontrado"
        })
    }

    //si me encuentra el vendedor,
    //accedemos a su propiedad role y comprobamos si es 1
    // si es 2, quiere decir que el usuario es vendedor
    // impongo la condición del rol para identificar al usuario, debe ser rol 1 (vendedor)
    if(user.role === 0 || user.role === 2 ){
        return res.status(400).json({
            success:false,
            message:"Acceso denegado, no eres vendedor"
        })
    }

    next()

    } catch (error) {
        return res.status(500).send({
            success:false,
            message:error.message
        })
    }
}

module.exports = authSeller
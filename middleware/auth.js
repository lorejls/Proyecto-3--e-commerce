const jwt = require('jsonwebtoken')



const auth = (req, res, next)=>{
    try {
        const token = req.header('Authorization')
        if(!token){
            return res.status(400).json({
                success:false,
                message: 'Invalid Authentification'
            })
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, (error, user)=>{
            if(error){
                return res.status(400).json({
                    success: false,
                    message: 'Tu token no es válido'
                })
            }

        // si la autentificación del token es exitosa pasa a la siguiente tarea y bloque de código
        req.user = user
        next()
        })





    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = auth
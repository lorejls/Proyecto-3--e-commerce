const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
        minlenght: 5,
        maxlenght: 100,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    seller:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
}) 

module.exports = mongoose.model('Product', productSchema)
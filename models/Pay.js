const mongoose = require('mongoose')

const paySchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    postalCode:{
        type:Number,
        required: true
    },
    shippingAddress: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    payment: {
        method: {
            type: String,
            enum: ['paypal'],
            required: true
        },
        paypalEmail: {
            type: String,
            required: function () {
                return this.payment.method === 'paypal';
            }
        }
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending'
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Cart', paySchema)
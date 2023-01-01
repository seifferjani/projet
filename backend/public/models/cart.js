var mongoose = require('mongoose')
const Schema = mongoose.Schema 

const cartSchema = new Schema({
    ref: {
        type: String
    },
    title: {
        type: String
    },
    prix: {
        type: Number
    },    
    amount: {
        type: Number
    },
    imageName: {
        type: Number
    }
       
})

const cart = mongoose.model('cart', cartSchema)
module.exports = cart
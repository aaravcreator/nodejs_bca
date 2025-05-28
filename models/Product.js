const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:Number,
    stock:Number,
    description:String,
})

const ProductModel = mongoose.model('Product',productSchema)
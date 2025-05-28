const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    phone:{
        type:String
    }
    ,
    remarks:{
        type:String
    }
})
const CustomerModel = mongoose.model('Customer',customerSchema)
module.exports = CustomerModel


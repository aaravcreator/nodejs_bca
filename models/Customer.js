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
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',}

})
const CustomerModel = mongoose.model('Customer',customerSchema)
module.exports = CustomerModel


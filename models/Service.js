
const mongoose = require('mongoose')

const serviceSchema  = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
        }
        ,
        featured:Boolean
    }
)

const ServiceModel = mongoose.model('Service',serviceSchema)

module.exports = ServiceModel

const express = require('express');
const Customer  = require('../models/Customer')

const router = express.Router()

// routes
router.get('/list',async(req,res)=>{
    //res.send("INDEX ROUTE FOR CUSTOMER")
    const customers =await Customer.find();
    console.log(customers)
    res.render('customer/list.ejs',{
        customers
    })

})

router.get('/create',(req,res)=>{
    res.render('customer/create.ejs')
})

router.post('/create',async(req,res)=>{

    console.log(req.body)
    const createdCustomer = await Customer.create(
        req.body
    )

    res.redirect('/customer/list')
})

module.exports = router



const express = require('express');
const Customer  = require('../models/Customer')

const router = express.Router()

// routes
router.get('/list',async(req,res)=>{
    //res.send("INDEX ROUTE FOR CUSTOMER")

    const searchKey = req.query.search;
    if(searchKey && searchKey.length >0){
    const customers =await Customer.find({
       name:searchKey
    });
    console.log(customers)
    res.render('customer/list.ejs',{
        customers
    })

        }
    else{
        const customers = await Customer.find({
        });
    console.log(customers)
    res.render('customer/list.ejs',{
        customers
        })
    }

    
   

})

router.get('/create',(req,res)=>{
    res.render('customer/create.ejs')
})

router.post('/create',async(req,res)=>{

    console.log(req.body)
    const userId = req.user.id
    const createdCustomer = await Customer.create({
        name:req.body.name,
        address: req.body.address,
        phone:req.body.phone,
        remarks:req.body.remarks,
      createdBy:userId
    })

    res.redirect('/customer/list')
})

module.exports = router



const express = require('express');
const Customer  = require('../models/Customer')
const multer = require('multer');
const path = require('path');

const router = express.Router()

// Configure storage to preserve file extensions
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save to 'uploads/' folder
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Get extension like '.jpg'
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });



// routes
router.get('/list',async(req,res)=>{
    //res.send("INDEX ROUTE FOR CUSTOMER")

    const searchKey = req.query.search;
    if(searchKey && searchKey.length >0){
    const customers =await Customer.find({
       name:searchKey,createdBy:req.user.id
    });
    console.log(customers)
    res.render('customer/list.ejs',{
        customers
    })
        }
    else{
        const customers = await Customer.find({
            createdBy:req.user.id
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

router.post('/create',upload.single('image'),async(req,res)=>{
    console.log(req.file)

    console.log(req.body)
    const userId = req.user.id
    const createdCustomer = await Customer.create({
        name:req.body.name,
        address: req.body.address,
        phone:req.body.phone,
        remarks:req.body.remarks,
        createdBy:userId,
      image: req.file ? '/' + req.file.path : '/uploads/avatar.jpg'
    })

    res.redirect('/customer/list')
})



module.exports = router



const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const router = express.Router()

router.get('/register',(req,res)=>{
        console.log(req.body)
res.render('auth/register.ejs')
})

router.post('/register',async (req,res)=>{
        console.log(req.body)

        bcrypt.hash(req.body.password,10,async(err,hash)=>{
            console.log(hash)
            const createdUser = await User.create({
                username:req.body.username,
                password:hash
            })
             res.send('User Registered Successfully')
        })

// res.render('auth/register.ejs')
})

module.exports = router
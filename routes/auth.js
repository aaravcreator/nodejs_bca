const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const SECRET_KEY = "abcd345"

router.get('/register',(req,res)=>{
        
res.render('auth/register.ejs',{
        errorMessage:""
})
})

router.post('/register',async (req,res)=>{

        const user = await User.findOne({
                username:req.body.username
        })

        if(user){
                return res.render('auth/register.ejs',{
                        errorMessage:"User already Exists"
                })

        }
        
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

router.get('/login',(req,res)=>{

        res.render('auth/login.ejs',{
                errorMessage:""
        })
})

router.post('/login',async (req,res)=>{
        const {username,password} = req.body
        console.log(username)
        const user = await User.findOne({
                username:username,
        })
        console.log(user)
        if(user){
        
            const result = await bcrypt.compare(password,user.password)

            if(result){
                console.log("User authenticated")

                // Here you can set a session or token for the user
                const token = jwt.sign({
                        id:user.id,
                        username:user.username},
                        SECRET_KEY,
                )
                console.log(token)
                //
                res.cookie('jwttoken',token,)
                res.send("User Authenticated")


            }
            else{
                console.log("Password error")
               return res.render('auth/login.ejs',{
                errorMessage:"Username or Password Error"
               })
            }
        }
        else{
                res.send('User not found')
        }


})

router.get('/logout',(req,res)=>{
        res.clearCookie('jwttoken')
        res.redirect('/auth/login')
})






module.exports = router
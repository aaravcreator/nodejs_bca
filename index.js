const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const CookieParser = require('cookie-parser')
require('dotenv').config(path.join(__dirname, '.env'))
const sendMail = require('./services/mailer')

const Service = require('./models/Service')
const Contact = require('./models/Contact')
const CustomerRoute = require('./routes/customer')
const AuthRoute = require('./routes/auth')

const AuthMiddleware = require('./middlewares/authMiddleware')
const app = express();
const port = process.env.PORT || 3000;





mongoose.connect('mongodb://localhost:27017/express-demo').then(()=>{
    console.log("Connected to MongoDB successfully")
})
.catch((err)=>{
    console.error("Error connecting to MongoDB", err);
})

app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));


app.use(CookieParser())
app.use(express.urlencoded({
    extended:true
}))// for parsing application/x-www-form-urlencoded
app.use(express.json())
app.set('view engine','ejs')


const protectMiddleware = (req,res,next)=>{
    console.log(req.method)
    console.log(req.url)

    console.log(req.cookies)
    const jwt_token  = req.cookies.jwttoken
    console.log(jwt_token)

    // if(req.query.token == "12345"){
    //         next()
    // }
    // else{
    //     res.send("Please Login")
    // }
    next()
    
}
// app.use(protectMiddleware)


app.use('/auth',AuthRoute)
app.use('/customer',AuthMiddleware,CustomerRoute)

app.get('/protected',AuthMiddleware,(req,res)=>{
    console.log("FROM PROTECTED ROUTE",req.user)
    console.log("Protected Route Accessed")
    res.send("This is a protected route")
})


app.get('/',async (req,res)=>{

    // res.send("<h1>THIS IS Homepage</h1> <p>Welcome to the homepage</p>")

        const myServices = await Service.find()
        console.log(myServices)



    const services = [
        {
            name:"Painting",
            description:"We provide best painting services",
            featured:true,
        },
        {
            name:"Interior Design",
            description:"We provide best interior design services",
            featured:false,
        },
        {
            name:"Exterior Design",
            description:"We provide best exterior design services",
            featured:true,
        }
    ]

    res.render('homepage',{
        businessName:"PASUPATI PAINTS",
        title:"Homepage",
        services:myServices,
        message:"Welcome to the homepage"
    })

})

app.get('/contact',(req,res)=>{


    res.render('contact',{
        businessName:"PASHUPATI PAINTS",
        title:"Contact Us",
        message:"Welcome to the contact page"
    })
})

app.post('/contact',async(req,res)=>{{
    console.log(req.body)
    const createdContact = await Contact.create(req.body)

    const subject = `New Contact request from ${req.body.email}`
    const html_message = `
        <h2> NAME : ${req.body.name} </h2>
        <h2> PHONE : ${req.body.phone} </h2>
        <h2> EMAIL : ${req.body.email} </h2>
        <h2> MESSAGE </h2>
        <p> ${req.body.message} </p>
    `

   const status = await  sendMail('aaravpoudel.pinnov@gmail.com',subject,html_message )


    res.render('contact',{
        businessName:"PASHUPATI PAINTS",
        title:"Contact Us",
        message:"Welcome to the contact page"
    })



}})







app.post('/services',async(req,res)=>{

    console.log(req.body)
   const createdService =  await Service.create(
    req.body
   )
   res.json(createdService)
  
//    res.json("SERVICE CREATED")
    // res.send("API for creating Service")
})

//update
app.put('/services/:id',async(req,res)=>{

    const updatedService = await Service.findByIdAndUpdate(
        req.params.id , req.body,{new:true}
    )
    res.json(updatedService)

})


// retrieve

app.get('/services/:id',async(req,res)=>{

    try{
        const service = await Service.findById({
            _id:req.params.id
        })
        res.json(service)
    }
    catch(error){
        res.json(error.message)
    }

})
// delete
app.delete('/services/:id',async(req,res)=>{


    const service = await Service.findByIdAndDelete({
        _id:req.params.id
    })
    res.json(service)

})



app.get('/services',(req,res)=>{


    res.send("THIS IS SERVICES PAGE")
})



app.get('/profile/:username',(req,res)=>{
    console.log(req.params)
    const { username } = req.params
    res.send("This is profile page of  "  + username ,)
})

app.get("/person",(req,res)=>{
    console.log(req.query)
    const { name, age } = req.query
    res.send("<h1>This is person page of " + name + " and age is " + age + "</h1>")
})

app.post('/person',(req,res)=>{
    console.log(req.body)
    res.send("<h1>This is person page of POST method</h1>")
})

app.put('/person/:id',(req,res)=>{
    const {id} = req.params;
    // res.send("This is person page of PUT method"+id )
    res.send(`This is person page of PUT method with id ${id}`)
})



app.get('/list_person',(req,res)=>{
    const personList = [
        {
            name:"Ram",
            age:45,
            address:"Biratnagar"
        },
        {
            name:"Kiran",
            age:40,
            address:"Dharan"
        },
        {
            name:"Sita",
            age:35,
            address:"Kathmandu"
        },
        {
            name:"Gita",
            age:30,
            address:"Pokhara"
        },
        {
            name:"Hari",
            age:25,
            address:"Lalitpur"
        }

    ]

    const { name } = req.query;
    if(!name){
        // return all person data
        return res.json(personList)
    }
    const person = personList.find(p=>{
        
        return p.name === name // return true if name matches
    });

    if(person){
        res.json(person);
    } else {
        res.status(404).send("Person not found");
    }
    /*check if name is in the array and return data if found else return false
*/

})



app.listen(port,()=>{
    console.log("Server is running on port",port)
})



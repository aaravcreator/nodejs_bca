
const jwt = require("jsonwebtoken")

const SECRET_KEY = process.env.SECRET_KEY


const authMiddleware = (req,res,next)=>{
    const jwttoken = req.cookies.jwttoken
    if(jwttoken){
    jwt.verify(jwttoken,SECRET_KEY,(err,decoded)=>{
        console.log(decoded)
        req.user = {
            id:decoded.id,
            username:decoded.username
        }
        next()
    })
    }
    else{
        res.redirect('/auth/login')
    }
   

}

module.exports = authMiddleware


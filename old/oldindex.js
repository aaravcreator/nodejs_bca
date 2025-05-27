const http = require('http');

const server = http.createServer((req,res)=>{
    console.log(req.url)
    res.writeHead(200,{
        'Content-Type':'application/json'
    })
    if(req.url == '/contact'){
        console.log(req.method)
        res.end('THIS IS CONTACT PAGE API')

    }
    else if (req.url == '/blog'){
        res.end('THIS is BLOG API ')
    }
    else if(req.url == '/services'){
        res.end('This is services api')
    }
    res.end("CHANGED DATA 233444")
})
server.listen(8000,()=>{
    console.log("server is running on port 3000")
})





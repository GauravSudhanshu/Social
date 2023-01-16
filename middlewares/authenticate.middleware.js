const jwt =require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token,"massai")
        if(decoded){
            req.body.userid=decoded.userid
            console.log(token,decoded.userid)
            next()
        }
        else{
            res.send("Login First")
        }
    }else{
        res.send("Login First")
    }
}
module.exports = {
    authenticate
}
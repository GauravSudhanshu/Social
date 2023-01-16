const express =  require("express")
const userRouter = express.Router()
const {UserModel} = require("../models/User.models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body
    try{
       bcrypt.hash(password,6,async(err,secure_password)=>{
        if(err){
            console.log(err)
        }else{
            const users=new UserModel({name,email,gender,password:secure_password})
            await users.save()
            res.send("Profile Registered")
        }

       })

    }
    catch(err){
res.send("Error in registering")
console.log(err)
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
   
    try{
        const user = await UserModel.find({email})
        console.log(user)
        const hashed_password = user[0].password
        if(user.length > 0){
            bcrypt.compare(password,hashed_password,(err,result) =>{
                if(result){
                    const key = process.env.key || "massai"
                    const token = jwt.sign({userid:email},key)
                    res.send({"mess":"Login Succesfully","token":token})
                }else{
                    res.send("Wrong Details")
                }
            })
        }
    }
    catch(err){
res.send("Something Went Wrong")
console.log(err)
    }
})


module.exports = {
    userRouter
}
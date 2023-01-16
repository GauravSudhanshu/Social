const express = require("express")
const postRouter = express.Router()
const {PostModel} = require("../models/Post.model")

postRouter.get("/",async(req,res)=>{


try{
    const post = await PostModel.find({userid:req.body.userid})
    res.send(post)
}
catch(err){
    res.send(err)
}
})
postRouter.post("/create",async(req,res)=>{
    console.log("asp")
    const {title,body,device,userid} = req.body
    try{
        const newpost = new PostModel({title,body,device,userid})
       await  newpost.save()
        res.send(newpost)
    }catch(err){
        res.send("Something went Wrong")
        console.log(err)
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    const post =  await PostModel.findOne({"_id":id})
    const useridreq = req.body.userid
try{
if(useridreq != post.userid){
    res.send({"msg":"You are not authorized"})
}else{
    await PostModel.findByIdAndDelete({"_id":id})
    res.send("Deleted")
}
}
catch(err){
    res.send("Something went Wrong")
}
})


postRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const post =  await PostModel.findOne({"_id":id})
    const useridreq = req.body.userid
try{
if(useridreq != post.userid){
    await PostModel.findByIdAndUpdate({"_id":id},...payload)
    console.log(PostModel)
    res.send({"msg":"You are not authorized"})
}else{
    res.send("Updated")
}
}
catch(err){
    res.send("Something went Wrong")
}
})

module.exports = {postRouter}
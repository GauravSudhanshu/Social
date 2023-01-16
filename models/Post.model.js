const mongoose =  require("mongoose")

const postSchema = mongoose.Schema({
    title : String,
    body : String,
    device :String,
    userid:String
})

const PostModel = mongoose.model("posts",postSchema)


module.exports={
    PostModel
}
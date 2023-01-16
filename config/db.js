const mongoose=require("mongoose")
console.log(process.env.db)
const connection = mongoose.connect(process.env.mongo_Url)

module.exports={
    connection
}
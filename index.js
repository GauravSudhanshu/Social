require ("dotenv").config()
const express = require("express")
const { connection } = require("./config/db")
const { PostModel } = require("./models/Post.model")
const {userRouter}=require("./routes/User.Routes")
const {authenticate}=require("./middlewares/authenticate.middleware")
const { postRouter } = require("./routes/Post.Routes")

const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)
const port = process.env.port || 3030
app.listen(port, async () => {
    await connection
    console.log("Server is running on port 3030")
})



import express from "express"
import router from "./routes/route.js";
const app = express();
import dotenv from "dotenv"
dotenv.config()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))
app.listen(3000,()=>{
    console.log(`server is running on ${3000} port`)
})
app.use(express.json())
app.use("/",router)

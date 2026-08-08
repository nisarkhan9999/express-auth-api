import express from "express"
const router = express.Router()
import { signupUser,loginUser } from "../controllers/controller.js" 

router.post("/signup",async(req,res)=>{
 try {
    await signupUser(req.body.email,req.body.password)
    return res.send("user is created")
 } catch (error) {
    res.send(error)
 }
})
router.post("/login",async(req,res)=>{
 try {
    const loginUser = loginUser(req.body.email,req.body.password)
  res.send(loginUser)
 } catch (error) {
    res.send(error)
 }
})
export default router
import fs from "fs"
import bcrypt from "bcryptjs"
import path from "path"
import { resolve } from "dns"
import { rejects } from "assert"
import { error } from "console"
import { json } from "stream/consumers"
const filePath = path.join(process.cwd(),"data","user.json")





const readfile =()=>{

return new Promise((resolve,rejects)=>{
fs.readFile(filePath,(error,data)=>{
if (error) {
    rejects(error)  
}
resolve(JSON.parse(data.toString()))
})
})
}

const writeFile =(data)=>{

return new Promise((resolve,rejects)=>{
    fs.writeFile(filePath,JSON.stringify(data),(error)=>{
if (error) {
    return rejects(error)
}
resolve();

    })
})
}


const signupUser = async(email,password)=>{

    try {
        const user= await readfile()
        const findemail = user.find((u)=> u.email ===email )
        if (findemail) {
             throw new Error("email is already exists")
        }
        else{
            const uId = Date.now()
            const passHas=await bcrypt.hash(password,10)
          await  writeFile([...user,{email,password:passHas}])
        }
        
    } catch (error) {
        throw error
        
    }

}
const loginUser=async(email,password)=>{
try {
const user =await readfile()
    const matched = user.find((u)=> u.email===email)
if (!matched) {
    throw new Error("user does not exist")
}
const hashedPass = await bcrypt.compare(password,matched.password)
if (!hashedPass) {
    throw new Error("password is invalid")
    
}
return "login successful"


} catch (error) {
   throw error 
}


}
export {signupUser,loginUser}




import express from 'express'
import  'dotenv/config'
import mongoose from 'mongoose'
import z from 'zod'
import bcrypt from 'bcrypt'
import {UserModel} from './db'


const app = express()
// conneting to the backend
mongoose.connect(`${process.env.MONGO_CONNECTION}`)


app.use(express.json())


// version of my backend
const runningVersion = "api/v1" 




app.post(`/${runningVersion}/signup`,async(req,res)=>{
    const UserInput = z.object({
        userName: z.string().max(30).min(3).trim().toLowerCase(),
        password:z.string().min(6),
        firstName:z.string().trim().max(40),
        lastName:z.string().trim().max(40),
    })

    const isValid = UserInput.safeParse({
        userName:req.body.userName,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

    if(!isValid.success){
        const errorMessage = isValid.error.formErrors
        res.status(411).json({
            userName:errorMessage.fieldErrors.firstName,
            password:errorMessage.fieldErrors.password,
            firstName:errorMessage.fieldErrors.firstName,
            lastName:errorMessage.fieldErrors.lastName,
        })

        return;
    }


    try{
        const hashedPassword = await bcrypt.hash(req.body.password,5);
        const resp = await UserModel.create({
            userName:req.body.userName,
            password:hashedPassword,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })
        if(!resp){
            res.status(403).json({
                message:"user already exists"
            })
            return;
        }
        
        res.status(200).json({
            message:"signup sucessfull"
        })

    }catch(err){
        res.status(500).json({
            message:"internal server error"
        })
    }
})


app.listen(3000,()=>{
    console.log("listing to port 3000")
})
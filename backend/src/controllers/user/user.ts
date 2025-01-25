import {Response,Request} from 'express'
import z from 'zod'
import bcrypt from 'bcrypt'
import {UserModel} from '../../db'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


export  async function singup(req:Request,res:Response){

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
            userName:errorMessage.fieldErrors.userName,
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
            res.status(411).json({
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


}


export async function signin(req:Request,res:Response){

        const UserInput = z.object({
            userName: z.string().max(30).min(3).trim().toLowerCase(),
            password:z.string().min(6),
        })
    
        const isValid = UserInput.safeParse({
            userName:req.body.userName,
            password:req.body.password,
        })
    
        if(!isValid.success){
            const errorMessage = isValid.error.formErrors
            res.status(411).json({
                userName:errorMessage.fieldErrors.userName,
                password:errorMessage.fieldErrors.password,
            })
    
            return;
        }
    
    
        const isUserValid = await UserModel.findOne({userName:req.body.userName});
        if(!isUserValid){
            res.status(404).json({
                message:"user not availabel"
            })
            return;
        }
    
        const isCorrectPassword = await bcrypt.compare(req.body.password,String(isUserValid.password))
       
        if(!isCorrectPassword){
            res.status(411).json({
                message:"password is incorrect"
            })
            return; 
        }
        
        const token = jwt.sign({
            userId: isUserValid._id
        },`${process.env.JWT_SECRET}`)
        res.status(200).json({
            message:"login sucessfull",
            token: token
        })
    
    
}
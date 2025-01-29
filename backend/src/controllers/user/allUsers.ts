import {Response,Request} from 'express'
import z from 'zod'
import bcrypt from 'bcrypt'
import {AccountModel, UserModel} from '../../db'
import jwt from 'jsonwebtoken'
import 'dotenv/config'








export async function getusers(req:Request,res:Response){
   
    const filter:string = req.query.filter  as string ;
    try{

        const users = await UserModel.find({
            $or:[
                {firstName:{"$regex":filter|| ""}},
                {lastName:{"$regex":filter || ""}}
            ]
        })
        res.status(200).json({
            user:users.filter(user=> user._id!=req.body.userId).map(user=> ({
                userName:user.userName,
                firstName:user.firstName,
                lastName:user.lastName,
                _id: user._id

            }))
        })
    }catch(err){
        res.status(500).json({
            message:"interal server error"
        })
    }
}
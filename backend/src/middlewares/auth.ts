import {Response,Request,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import 'dotenv/config'


export async function auth(req:Request,res:Response,next:NextFunction) {
    
    const token = req.headers.token as String | any; 
    if(!token){
        res.status(403).json({
            message:"token not found"
        })
        return; 
    }
    try{
        const isValid:{userId:string,iat:number}|any = jwt.verify(token,`${process.env.JWT_SECRET}`)
     
        if(!isValid){
            res.status(403).json({
            message:"token not valid"
            })
            return;
        }


        req.body.userId = isValid.userId; 
        next()
    }catch(err){
        res.status(500).json({
            message:"internal server error"
        })
    }

    
}
import {Response,Request} from 'express'
import z from 'zod'
import bcrypt from 'bcrypt'
import {AccountModel, PinModel, UserModel} from '../../db'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


export  async function singup(req:Request,res:Response){

    const UserInput = z.object({
        userName: z.string().max(30).min(3).trim().toLowerCase(),
        password:z.string().min(6),
        firstName:z.string().trim().max(40),
        lastName:z.string().trim().max(40),
        amount: z.number().positive().min(1).max(10000),
        transactionPin:z.number().positive().min(1).max(999999)
    })

    const isValid = UserInput.safeParse({
        userName:req.body.userName,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        amount:req.body.amount,
        transactionPin:req.body.transactionPin
    })

    if(!isValid.success){
        const errorMessage = isValid.error.formErrors
        res.status(411).json({
            userName:errorMessage.fieldErrors.userName,
            password:errorMessage.fieldErrors.password,
            firstName:errorMessage.fieldErrors.firstName,
            lastName:errorMessage.fieldErrors.lastName,
            amount:errorMessage.fieldErrors.amount,
            transactionPin:errorMessage.fieldErrors.transactionPin
        })

        return;
    }


    try{
        const hashedPassword = await bcrypt.hash(req.body.password,5);
        const hashedPin = await bcrypt.hash(String(req.body.transactionPin),6);

        const userid = await UserModel.create({
            userName:req.body.userName,
            password:hashedPassword,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })

        await AccountModel.create({
            userId:userid._id,
            balance:req.body.amount
        })
        
        await PinModel.create({
            userId:userid._id,
            transactionPin:hashedPin
        })

        res.status(200).json({
            message:"signup sucessfull"
        })

    }catch(err:any){
        if(err?.code == 11000){
            res.status(411).json({
                message:"user Already exist"
            })
            return 
        }

        console.log(err)
        res.status(500).json({
            message:"internal server error",
            error:err
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

        const userBalance = await AccountModel.findOne({userId:isUserValid._id});
        res.status(200).json({
            message:"login sucessfull",
            userFirstName:isUserValid.firstName,
            balance:userBalance?.balance,
            token: token
        })
    
    
}


export async function updateInfo(req:Request,res:Response) {

    const UserInput = z.object({
        newpassword:z.string().min(6).optional(),
        oldpassword:z.string().min(6).optional(),
        firstName:z.string().trim().max(40).optional(),
        lastName:z.string().trim().max(40).optional(),
    }).refine((data)=> !data.newpassword || data.oldpassword,{
        message:"old password is required for setting new password",
        path:['oldpassword'],
    }
    )


    const isValid = UserInput.safeParse({
        newpassword:req.body.newpassword,
        oldpassword:req.body.oldpassword,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

    if(!isValid.success){
        const errorMessage = isValid.error.formErrors
        res.status(411).json({
            newpassword:errorMessage.fieldErrors.newpassword,
            oldpassword:errorMessage.fieldErrors.oldpassword,
            firstName:errorMessage.fieldErrors.firstName,
            lastName:errorMessage.fieldErrors.lastName,
        })

        return;
    }


    const isUserValid = await UserModel.findById({_id:req.body.userId});
    if(!isUserValid){
        res.status(404).json({
            message:"user not availabel"
        })
        return;
    }

    if(req.body.oldpassword){
        const isCorrectPassword = await bcrypt.compare(req.body.oldpassword,String(isUserValid.password))
   
        if(!isCorrectPassword){
        res.status(411).json({
            message:"password is incorrect"
        })
        return; 
        }
    
        try{
            const hashedPassword = await bcrypt.hash(req.body.newpassword,5);
            const updatedUser = await UserModel.findByIdAndUpdate(req.body.userId,{
                $set:{firstName:req.body.firstName||isUserValid.firstName,lastName:req.body.lastName||isUserValid.lastName,password:hashedPassword}
            },{new: true,runValidators: true})

            res.status(200).json({
                message:"update sucessfull",
                data:{firstName:updatedUser?.firstName,lastName:updatedUser?.lastName},
            })
        }catch(err){
            res.status(500).json({
                message:"interal server errror",
                error: err
            })
        }

        return;
    }else{

        try{

            const updatedUser = await UserModel.findByIdAndUpdate(req.body.userId,{
                $set:{firstName:req.body.firstName,lastName:req.body.lastName}
            },{new:true,runValidators:true})

            res.status(200).json({
                message:"update sucessfull",
                data:{firstName:updatedUser?.firstName,lastName:updatedUser?.lastName}
            })

        }catch(err){
            res.status(500).json({
                message:"interal server errror",
                error: err
            })
        }

    }


    


    
}






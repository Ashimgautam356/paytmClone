import { Response,Request } from "express";
import { AccountModel, PinModel, StatementModel } from "../../db";
import mongoose from "mongoose";
import z from 'zod'
import bcrypt from 'bcrypt'


export async function transferMoney(req:Request,res:Response) {
    const {balance,to,userId,transactionPin,remarks} = req.body

   const UserInput = z.object({
            remarks: z.string().optional(),
            balance: z.number().positive().min(1).max(10000),
            transactionPin:z.number().positive().min(1).max(999999)
       })
   
       const isValid = UserInput.safeParse({
            remarks: req.body.remarks,
            balance:req.body.balance,
            transactionPin:req.body.transactionPin
       })
   
       if(!isValid.success){
           const errorMessage = isValid.error.formErrors
           res.status(411).json({
               remarks:errorMessage.fieldErrors.remarks,
               balance:errorMessage.fieldErrors.balance,
               transactionPin:errorMessage.fieldErrors.transactionPin
           })
   
           return;
       }

   
    try{   
        const senderPin = await PinModel.findOne({userId:userId})
        const currentAttempt = senderPin?.failedAttempts as number;
        const isCorrectPassword = await bcrypt.compare(String(transactionPin),String(senderPin?.transactionPin))

        if(!isCorrectPassword){
            await PinModel.updateOne({userId:userId}, { $inc: { failedAttempts: 1 } })
            if(currentAttempt+1 == 3){
                res.status(403).json({
                    message:"incorrect pin code",
                    accountStatus:"your accout has been blocked"
                })
                return;
            }
            res.status(403).json({
                message:"incorrect pin code",
                attemptRemeaning: 3-currentAttempt
            })
            return;
        }
        
        if(currentAttempt>0){
            await PinModel.updateOne({userId:userId}, { $set: { failedAttempts: 0 } })
        }

        const session = await mongoose.startSession();


        session.startTransaction();

        const sender:any= await AccountModel.findOne({userId:userId}).session(session);


        if (!sender || sender.balance < balance){
            await session.abortTransaction();
            res.status(400).json({
                message: "Insufficient balance"
            });
            return;
        }

        const reciever = await AccountModel.findOne({ userId: to }).session(session);
        if (!reciever) {
            await session.abortTransaction();
            res.status(400).json({
                message: "Invalid account"
            });
            return;
        }

        await AccountModel.updateOne({ userId: userId }, { $inc: { balance: -balance } }).session(session);
        await AccountModel.updateOne({ userId: to }, { $inc: { balance: balance } }).session(session);
        await StatementModel.create([{
            userId:userId,
            method:"Debit",
            remarks:remarks, 
            balance:balance,
            to:to
        }],{session:session});
        
        await StatementModel.create([{
            userId:to,
            method:"Credit",
            remarks:remarks, 
            balance:balance,
            to:userId
        }],{session:session})

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"internal server error"
        })
    }

}
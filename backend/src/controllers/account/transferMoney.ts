import { Response,Request } from "express";
import { AccountModel } from "../../db";
import mongoose from "mongoose";

export async function transferMoney(req:Request,res:Response) {
    const {balance,to,userId } = req.body

    if(!balance || typeof balance !== 'number'  ){
        res.status(400).json({
            message:"enter valid balance"
        })
        return;
    }
    try{   
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


        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    }catch(err){
        res.status(500).json({
            message:"internal server error"
        })
    }

}
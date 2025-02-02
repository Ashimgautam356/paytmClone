import { Response,Request } from "express";
import { AccountModel } from "../../db";



export async function getBalance(req:Request,res:Response) {
    const userId = req.body.userId

    try{
        const user = await AccountModel.findOne({userId:userId})
        res.status(200).json({
            message:"success",
            balance:user?.balance
        })

    }catch(err){
        res.status(500).json({
            message:"internal server error",
            error:err
        })
    }

}
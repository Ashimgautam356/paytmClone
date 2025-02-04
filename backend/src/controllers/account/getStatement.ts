import { Response,Request } from "express";
import { StatementModel } from "../../db";



export async function getStatement(req:Request,res:Response) {
    const userId = req.body.userId

    try{
        const user = await StatementModel.find({userId:userId})
        res.status(200).json({
            message:"success",
            statement:user
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"internal server error",
            error:err
        })
    }

}
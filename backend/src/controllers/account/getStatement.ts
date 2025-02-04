import { Response,Request } from "express";
import { StatementModel } from "../../db";



export async function getStatement(req:Request,res:Response) {
    const userId = req.body.userId

    try{
        const user = await StatementModel.findById({userId:userId})
        console.log(user)
        res.status(200).json({
            message:"success",
            statement:user
        })

    }catch(err){
        res.status(500).json({
            message:"internal server error",
            error:err
        })
    }

}
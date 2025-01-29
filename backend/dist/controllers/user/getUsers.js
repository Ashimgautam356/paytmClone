"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
require("dotenv/config");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({
            message: "hello "
        });
        // const fil`ter:string = req.query.filter  as string ;
        // console.log("what is happeinig")
        // try{
        //     const users = await UserModel.find({
        //         $or:[
        //             {firstName:{"$regex":filter|| ""}},
        //             {lastName:{"$regex":filter || ""}}
        //         ]
        //     })
        //     console.log("stucked?")
        //     console.log(users)
        //     res.status(200).json({
        //         user:Array.isArray(users)?users.map(user=> ({
        //             userName:user.userName,
        //             firstName:user.firstName,
        //             lastName:user.lastName,
        //             _id: user._id
        //         })):"empty"
        //     })
        // }catch(err){
        //     console.log(err)
        //     res.status(500).json({
        //         message:"interal server error"
        //     })
        // }
    });
}

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
exports.getusers = getusers;
const db_1 = require("../../db");
require("dotenv/config");
function getusers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = req.query.filter;
        try {
            const users = yield db_1.UserModel.find({
                $or: [
                    { firstName: { "$regex": filter || "" } },
                    { lastName: { "$regex": filter || "" } }
                ]
            });
            res.status(200).json({
                user: users.filter(user => user._id != req.body.userId).map(user => ({
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    _id: user._id
                }))
            });
        }
        catch (err) {
            res.status(500).json({
                message: "interal server error"
            });
        }
    });
}

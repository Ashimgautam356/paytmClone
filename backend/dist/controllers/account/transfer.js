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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = transfer;
const db_1 = require("../../db");
const zod_1 = __importDefault(require("zod"));
const mongoose_1 = __importDefault(require("mongoose"));
function transfer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.body.userId;
        const userSchema = zod_1.default.object({
            to: zod_1.default.string(),
            balance: zod_1.default.number().min(5)
        });
        const isValid = userSchema.safeParse({
            to: req.body.to,
            balance: req.body.balance
        });
        if (!isValid.success) {
            const errorMessage = isValid.error.formErrors;
            res.status(411).json({
                to: errorMessage.fieldErrors.to,
                balance: errorMessage.fieldErrors.balance
            });
            return;
        }
        const reciverId = new mongoose_1.default.Types.ObjectId(req.body.to);
        const user = yield db_1.AccountModel.findOne(userId);
        console.log(user);
        const userCurrentBalance = user === null || user === void 0 ? void 0 : user.balance;
        console.log(userCurrentBalance);
        const moneyAfterSending = userCurrentBalance - req.body.balance;
        console.log(moneyAfterSending);
        const receiver = yield db_1.AccountModel.findOne(reciverId);
        console.log(receiver);
        if (moneyAfterSending >= 0) {
            try {
                yield db_1.AccountModel.findByIdAndUpdate({ userId: userId }, {
                    $set: { balance: moneyAfterSending }
                }, { new: true, runValidators: true });
                yield db_1.AccountModel.findByIdAndUpdate({ userId: reciverId }, {
                    $set: { balance: (receiver === null || receiver === void 0 ? void 0 : receiver.balance) + req.body.balance }
                }, { new: true, runValidators: true });
                res.status(200).json({
                    message: "Transfer Sucessfull"
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal server error",
                    error: err
                });
            }
        }
        else {
            res.status(400).json({
                message: "insufficent balance"
            });
        }
    });
}

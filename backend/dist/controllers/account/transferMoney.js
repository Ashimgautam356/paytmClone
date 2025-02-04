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
exports.transferMoney = transferMoney;
const db_1 = require("../../db");
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function transferMoney(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { balance, to, userId, transactionPin, remarks } = req.body;
        const UserInput = zod_1.default.object({
            remarks: zod_1.default.string().optional(),
            balance: zod_1.default.number().positive().min(1).max(10000),
            transactionPin: zod_1.default.number().positive().min(1).max(999999)
        });
        const isValid = UserInput.safeParse({
            remarks: req.body.remarks,
            balance: req.body.balance,
            transactionPin: req.body.transactionPin
        });
        if (!isValid.success) {
            const errorMessage = isValid.error.formErrors;
            res.status(411).json({
                remarks: errorMessage.fieldErrors.remarks,
                balance: errorMessage.fieldErrors.balance,
                transactionPin: errorMessage.fieldErrors.transactionPin
            });
            return;
        }
        try {
            const senderPin = yield db_1.PinModel.findOne({ userId: userId });
            const currentAttempt = senderPin === null || senderPin === void 0 ? void 0 : senderPin.failedAttempts;
            const isCorrectPassword = yield bcrypt_1.default.compare(String(transactionPin), String(senderPin === null || senderPin === void 0 ? void 0 : senderPin.transactionPin));
            if (!isCorrectPassword) {
                yield db_1.PinModel.updateOne({ userId: userId }, { $inc: { failedAttempts: 1 } });
                if (currentAttempt + 1 == 3) {
                    res.status(403).json({
                        message: "incorrect pin code",
                        accountStatus: "your accout has been blocked"
                    });
                    return;
                }
                res.status(403).json({
                    message: "incorrect pin code",
                    attemptRemeaning: 3 - currentAttempt
                });
                return;
            }
            if (currentAttempt > 0) {
                yield db_1.PinModel.updateOne({ userId: userId }, { $set: { failedAttempts: 0 } });
            }
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            const sender = yield db_1.AccountModel.findOne({ userId: userId }).session(session);
            if (!sender || sender.balance < balance) {
                yield session.abortTransaction();
                res.status(400).json({
                    message: "Insufficient balance"
                });
                return;
            }
            const reciever = yield db_1.AccountModel.findOne({ userId: to }).session(session);
            if (!reciever) {
                yield session.abortTransaction();
                res.status(400).json({
                    message: "Invalid account"
                });
                return;
            }
            yield db_1.AccountModel.updateOne({ userId: userId }, { $inc: { balance: -balance } }).session(session);
            yield db_1.AccountModel.updateOne({ userId: to }, { $inc: { balance: balance } }).session(session);
            yield db_1.StatementModel.create([{
                    userId: userId,
                    method: "Debit",
                    remarks: remarks,
                    balance: balance,
                    to: to
                }], { session: session });
            yield db_1.StatementModel.create([{
                    userId: to,
                    method: "Credit",
                    remarks: remarks,
                    balance: balance,
                    to: userId
                }], { session: session });
            yield session.commitTransaction();
            res.json({
                message: "Transfer successful"
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                message: "internal server error"
            });
        }
    });
}

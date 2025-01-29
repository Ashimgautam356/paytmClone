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
function transferMoney(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        const { balance, to, userId } = req.body;
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
        yield session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    });
}

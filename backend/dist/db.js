"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinModel = exports.StatementModel = exports.AccountModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    firstName: {
        type: String,
        require: true,
        trim: true,
        maxLength: 40,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        maxLength: 40,
    }
}, { timestamps: true });
const AccountTable = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, require: true, unique: true, ref: "User" },
    balance: { type: Number, min: 0 }
});
const StatementTable = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, require: true, unique: false, ref: "User" },
    method: { type: String, require: true },
    to: { type: mongoose_1.default.Types.ObjectId, require: true, ref: "User" },
    remarks: { type: String },
    balance: { type: Number, min: 0 }
}, { timestamps: true });
const TransactionPin = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, require: true, unique: true, ref: "User" },
    transactionPin: { type: String, require: true },
    failedAttempts: { type: Number, default: 0 }
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model("User", UserSchema);
exports.AccountModel = mongoose_1.default.model('Account', AccountTable);
exports.StatementModel = mongoose_1.default.model('Statement', StatementTable);
exports.PinModel = mongoose_1.default.model('TransactionPin_pin', TransactionPin);

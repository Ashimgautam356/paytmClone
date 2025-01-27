"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = exports.UserModel = void 0;
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
});
const AccountTable = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, require: true, unique: true, ref: "User" },
    balance: { type: Number, min: 0 }
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
exports.AccountModel = mongoose_1.default.model('Account', AccountTable);

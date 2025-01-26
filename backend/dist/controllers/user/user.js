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
exports.singup = singup;
exports.signin = signin;
exports.updateInfo = updateInfo;
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
function singup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const UserInput = zod_1.default.object({
            userName: zod_1.default.string().max(30).min(3).trim().toLowerCase(),
            password: zod_1.default.string().min(6),
            firstName: zod_1.default.string().trim().max(40),
            lastName: zod_1.default.string().trim().max(40),
        });
        const isValid = UserInput.safeParse({
            userName: req.body.userName,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        if (!isValid.success) {
            const errorMessage = isValid.error.formErrors;
            res.status(411).json({
                userName: errorMessage.fieldErrors.userName,
                password: errorMessage.fieldErrors.password,
                firstName: errorMessage.fieldErrors.firstName,
                lastName: errorMessage.fieldErrors.lastName,
            });
            return;
        }
        try {
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 5);
            const resp = yield db_1.UserModel.create({
                userName: req.body.userName,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            });
            if (!resp) {
                res.status(411).json({
                    message: "user already exists"
                });
                return;
            }
            res.status(200).json({
                message: "signup sucessfull"
            });
        }
        catch (err) {
            res.status(500).json({
                message: "internal server error"
            });
        }
    });
}
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const UserInput = zod_1.default.object({
            userName: zod_1.default.string().max(30).min(3).trim().toLowerCase(),
            password: zod_1.default.string().min(6),
        });
        const isValid = UserInput.safeParse({
            userName: req.body.userName,
            password: req.body.password,
        });
        if (!isValid.success) {
            const errorMessage = isValid.error.formErrors;
            res.status(411).json({
                userName: errorMessage.fieldErrors.userName,
                password: errorMessage.fieldErrors.password,
            });
            return;
        }
        const isUserValid = yield db_1.UserModel.findOne({ userName: req.body.userName });
        if (!isUserValid) {
            res.status(404).json({
                message: "user not availabel"
            });
            return;
        }
        const isCorrectPassword = yield bcrypt_1.default.compare(req.body.password, String(isUserValid.password));
        if (!isCorrectPassword) {
            res.status(411).json({
                message: "password is incorrect"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: isUserValid._id
        }, `${process.env.JWT_SECRET}`);
        res.status(200).json({
            message: "login sucessfull",
            token: token
        });
    });
}
function updateInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const UserInput = zod_1.default.object({
            newpassword: zod_1.default.string().min(6).optional(),
            oldpassword: zod_1.default.string().min(6).optional(),
            firstName: zod_1.default.string().trim().max(40).optional(),
            lastName: zod_1.default.string().trim().max(40).optional(),
        }).refine((data) => !data.newpassword || data.oldpassword, {
            message: "old password is required for setting new password",
            path: ['oldpassword'],
        });
        const isValid = UserInput.safeParse({
            newpassword: req.body.newpassword,
            oldpassword: req.body.oldpassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        if (!isValid.success) {
            const errorMessage = isValid.error.formErrors;
            res.status(411).json({
                newpassword: errorMessage.fieldErrors.newpassword,
                oldpassword: errorMessage.fieldErrors.oldpassword,
                firstName: errorMessage.fieldErrors.firstName,
                lastName: errorMessage.fieldErrors.lastName,
            });
            return;
        }
        const isUserValid = yield db_1.UserModel.findById({ _id: req.body.userId });
        if (!isUserValid) {
            res.status(404).json({
                message: "user not availabel"
            });
            return;
        }
        if (req.body.oldpassword) {
            const isCorrectPassword = yield bcrypt_1.default.compare(req.body.oldpassword, String(isUserValid.password));
            if (!isCorrectPassword) {
                res.status(411).json({
                    message: "password is incorrect"
                });
                return;
            }
            try {
                const hashedPassword = yield bcrypt_1.default.hash(req.body.newpassword, 5);
                const updatedUser = yield db_1.UserModel.findByIdAndUpdate(req.body.userId, {
                    $set: { firstName: req.body.firstName || isUserValid.firstName, lastName: req.body.lastName || isUserValid.lastName, password: hashedPassword }
                }, { new: true, runValidators: true });
                res.status(200).json({
                    message: "update sucessfull",
                    data: { firstName: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.firstName, lastName: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.lastName }
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "interal server errror",
                    error: err
                });
            }
            return;
        }
        else {
            try {
                const updatedUser = yield db_1.UserModel.findByIdAndUpdate(req.body.userId, {
                    $set: { firstName: req.body.firstName, lastName: req.body.lastName }
                }, { new: true, runValidators: true });
                res.status(200).json({
                    message: "update sucessfull",
                    data: { firstName: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.firstName, lastName: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.lastName }
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "interal server errror",
                    error: err
                });
            }
        }
    });
}

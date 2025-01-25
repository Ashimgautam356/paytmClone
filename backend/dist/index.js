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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const app = (0, express_1.default)();
// conneting to the backend
mongoose_1.default.connect(`${process.env.MONGO_CONNECTION}`);
app.use(express_1.default.json());
// version of my backend
const runningVersion = "api/v1";
app.post(`/${runningVersion}/signup`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            res.status(403).json({
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
}));
app.post(`/${runningVersion}/singin`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    console.log(isCorrectPassword);
    if (!isCorrectPassword) {
        res.status(403).json({
            message: "password is incorrect"
        });
        return;
    }
    res.status(200).json({
        message: "login sucessfull"
    });
}));
app.listen(3000, () => {
    console.log("listing to port 3000");
});

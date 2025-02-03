"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user/user");
const auth_1 = require("../middlewares/auth");
const allUsers_1 = require("../controllers/user/allUsers");
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/hello', (req, res) => {
    res.send("hello");
});
exports.userRouter.post('/signup', user_1.singup);
exports.userRouter.post('/signin', user_1.signin);
exports.userRouter.use(auth_1.auth);
exports.userRouter.patch('/update', user_1.updateInfo);
exports.userRouter.get('/bulk', allUsers_1.getusers);

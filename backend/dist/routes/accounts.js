"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const getBalance_1 = require("../controllers/account/getBalance");
const transferMoney_1 = require("../controllers/account/transferMoney");
const auth_1 = require("../middlewares/auth");
const getStatement_1 = require("../controllers/account/getStatement");
exports.accountRouter = express_1.default.Router();
exports.accountRouter.use(auth_1.auth);
exports.accountRouter.get('/balance', getBalance_1.getBalance);
exports.accountRouter.post('/transfer', transferMoney_1.transferMoney);
exports.accountRouter.get('/statement', getStatement_1.getStatement);

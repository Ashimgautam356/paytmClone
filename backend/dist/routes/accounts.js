"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const getBalance_1 = require("../controllers/account/getBalance");
const transfer_1 = require("../controllers/account/transfer");
exports.accountRouter = express_1.default.Router();
exports.accountRouter.get('/balance', getBalance_1.getBalance);
exports.accountRouter.post('/transfer', transfer_1.transfer);

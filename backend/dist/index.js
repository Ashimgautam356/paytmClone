"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
// conneting to the backend
mongoose_1.default.connect(`${process.env.MONGO_CONNECTION}`);
const myfrontend = ['http://localhost:3001'];
// app.use(cors({
//     optionsSuccessStatus:200,
//     origin: myfrontend
// }))
app.use(express_1.default.json());
app.use('/api/v1', index_1.router);
app.listen(3000, () => {
    console.log("listing to port 3000");
});

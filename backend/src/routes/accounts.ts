import express from 'express'
import { getBalance } from '../controllers/account/getBalance';
import { transfer } from '../controllers/account/transfer';


export const accountRouter = express.Router();

accountRouter.get('/balance', getBalance)
accountRouter.post('/transfer',transfer)
import express from 'express'
import { getBalance } from '../controllers/account/getBalance';
import { transferMoney } from '../controllers/account/transferMoney';
import { auth } from '../middlewares/auth';
import { getStatement } from '../controllers/account/getStatement';
export const accountRouter = express.Router();


accountRouter.use(auth)
accountRouter.get('/balance', getBalance)
accountRouter.post('/transfer',transferMoney )
accountRouter.get('/statement',getStatement)
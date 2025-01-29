import express from 'express'
import { getBalance } from '../controllers/account/getBalance';
import { transferMoney } from '../controllers/account/transferMoney';
import { auth } from '../middlewares/auth';
export const accountRouter = express.Router();


accountRouter.use(auth)
accountRouter.get('/balance', getBalance)
accountRouter.post('/transfer',transferMoney )
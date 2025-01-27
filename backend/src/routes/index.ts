import express from 'express'
import { userRouter } from './user';
import { accountRouter } from './accounts';

export const router = express.Router();


router.use('/user',userRouter)
router.use('/account', accountRouter)



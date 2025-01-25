import express from 'express'
import { userRouter } from './user';


export const router = express.Router();


router.post('/user',userRouter)



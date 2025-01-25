import express from 'express'
import { singup,signin } from '../controllers/user/user';


export const userRouter  = express.Router();


userRouter.post('/signup',singup)
userRouter.post('/signin',signin)
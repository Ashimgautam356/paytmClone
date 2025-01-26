import express from 'express'
import { singup,signin,updateInfo, getUsers } from '../controllers/user/user';
import { auth } from '../middlewares/auth';

export const userRouter  = express.Router();


userRouter.post('/signup',singup)
userRouter.post('/signin',signin)

userRouter.use(auth)

userRouter.patch('/update',updateInfo)
userRouter.get('/bulk',getUsers)
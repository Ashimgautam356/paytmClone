import express from 'express'
import { singup,signin,updateInfo} from '../controllers/user/user';
import { auth } from '../middlewares/auth';
import { getusers } from '../controllers/user/allUsers';

export const userRouter  = express.Router();


userRouter.post('/signup',singup)
userRouter.post('/signin',signin)

userRouter.use(auth)

userRouter.patch('/update',updateInfo)
userRouter.get('/bulk',getusers)
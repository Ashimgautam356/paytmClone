import express from 'express'
import { singup,signin } from '../controllers/user/user';
import { auth } from '../middlewares/auth';


export const userRouter  = express.Router();


userRouter.post('/signup',singup)
userRouter.post('/signin',signin)

userRouter.use(auth)

userRouter.get('/hello',(req,res)=>{
    res.send("hello world")
})
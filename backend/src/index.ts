import express from 'express'
import  'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'
import {router} from './routes/index'


const app = express()
// conneting to the backend
mongoose.connect(`${process.env.MONGO_CONNECTION}`)


const myfrontend = ["https://paytmclone-frontend.onrender.com"]
app.use(cors({
    optionsSuccessStatus:200,
    origin: myfrontend

}))


app.use(express.json())


app.use('/api/v1',router)




app.listen(3000,()=>{
    console.log("listing to port 3000")
})
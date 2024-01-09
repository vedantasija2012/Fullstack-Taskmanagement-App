import express from "express";
import dotenv from 'dotenv'
import user from './routes/user.js'
import task from './routes/task.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

if(process.env.NODE_ENV!=='production'){
    dotenv.config({path:'config/config.env'})
}

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

const app = express()

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/api/v1', task)
app.use('/api/v1', user)

export default app;
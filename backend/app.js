import express from "express";
import dotenv from 'dotenv'
import user from './routes/user.js'
import task from './routes/task.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()


const app = express()

app.use(cors({
  origin: ["https://frontend-taskmanagement-app.onrender.com"], // your deployed frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', task)
app.use('/api/v1', user)

export default app;
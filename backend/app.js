import express from "express";
import dotenv from 'dotenv'
import user from './routes/user.js'
import task from './routes/task.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from "path";

dotenv.config()


const app = express()

const __dirname = path.resolve();

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

app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

export default app;
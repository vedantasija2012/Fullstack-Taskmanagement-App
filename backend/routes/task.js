import express from 'express'
import { createTask, deleteTask, showTasks, updateTask } from '../controllers/task.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.route('/new/task').post(isAuthenticated, createTask)

router.route('/task/:id').delete(isAuthenticated, deleteTask).put(isAuthenticated, updateTask);

router.route('/tasks').get(isAuthenticated, showTasks)

export default router
import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  createTask,
  getAllTask,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/TaskController.js';

const TaskRouter = express.Router();

// Route to get all tasks or create a new task
TaskRouter.route('/gp')
  .get(authMiddleware, getAllTask)
  .post(authMiddleware, createTask);

// Route to get, update, or delete a specific task by ID
TaskRouter.route('/:id/gp')
  .get(authMiddleware, getTaskById)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

export default TaskRouter;

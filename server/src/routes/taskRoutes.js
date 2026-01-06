import express from 'express';
const router = express.Router();
import {
    getTasks,
    setTask,
    updateTask,
    deleteTask,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getTasks).post(protect, setTask);
router.route('/:id').delete(protect, deleteTask).put(protect, updateTask);

export default router;

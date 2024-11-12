import express from 'express';
import {
  addUser,
  deleteUser,
  getUsers,
  getUser,
  signinUser,
  updateUser,
  signinGoogle,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/me', protect, getUser);
router.post('/', addUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.post('/login', signinUser);
router.post('/google', signinGoogle);

export default router;
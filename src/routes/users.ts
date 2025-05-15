import express from 'express';
import {
  fetchAllUsers,
  fetchUserById,
  updateUser,
  deleteUser
} from '../controller/usersController';
import { fetchAllBooks } from '../controller/booksController';
import { verifyAccessToken } from '../middleware/verifyToken';

const router = express.Router();

// Base endpoints
router.get('/:id', fetchUserById);

// Protected endpoints
router.get('/', verifyAccessToken, fetchAllUsers);
router.patch('/:id', verifyAccessToken, updateUser);
router.delete('/:id', verifyAccessToken, deleteUser);

export default router;
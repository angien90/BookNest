import express from 'express';
import {
  fetchAllUsers,
  fetchUserById,
  updateUser,
  deleteUser
} from '../controller/usersController';
import { fetchAllBooks } from '../controller/booksController';

const router = express.Router();

// Base endpoints
router.get('/', fetchAllUsers)
router.get('/:id', fetchUserById)

// Protected endpoints (NOT YET)
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
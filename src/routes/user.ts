import express from 'express';
import {
  fetchAllUsers,
  fetchUserById,
  updateUser,
  deleteUser
} from '../controller/usersController';
import { fetchAllBooks } from '../controller/booksController';

const router = express.Router();

router.get('/', fetchAllUsers)
router.get('/:id', fetchUserById)

export default router;
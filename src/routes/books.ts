import express from 'express';
import { 
  createBook, 
  deleteBook, 
  fetchAllBooks, 
  fetchBook, 
  updateBook } from '../controller/booksController';
import { verifyAccessToken } from '../middleware/verifyToken';
const router = express.Router()

router.get('/', fetchAllBooks)
router.get('/:id', fetchBook)

// Protected endpoints
router.post('/', verifyAccessToken, createBook)
router.patch('/:id',verifyAccessToken, updateBook)
router.delete('/:id',verifyAccessToken, deleteBook)

export default router;
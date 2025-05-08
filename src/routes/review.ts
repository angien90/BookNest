import express from 'express';
import { fetchAllReviews } from '../controller/reviewController';
import { fetchReviewById } from '../controller/reviewController';
import { createReview } from '../controller/reviewController';
import { updateReview } from '../controller/reviewController';
import { deleteReview } from '../controller/reviewController';
import { verifyAccessToken } from '../middleware/verifyToken'


const router = express.Router();

router.get('/', fetchAllReviews);
router.get('/:id', fetchReviewById);
router.post('/', createReview);

// Protected endpoints
router.patch('/:id', updateReview)
router.delete('/:id', deleteReview)

export default router;
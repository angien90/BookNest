import express from 'express';
import { fetchAllReviews } from '../controller/reviewController';
import { fetchReviewById } from '../controller/reviewController';

const router = express.Router();

router.get('/', fetchAllReviews);
router.get('/:id', fetchReviewById);


export default router;
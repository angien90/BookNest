import express from 'express';
import { fetchAllRewievs } from '../controller/reviewController';

const router = express.Router();

router.get('/', fetchAllRewievs);


export default router;
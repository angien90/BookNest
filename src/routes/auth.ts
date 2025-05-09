import { Router } from 'express';
import { registerUser } from '../controller/authController';
import { verifyAccessToken } from '../middleware/verifyToken';

const router = Router();

router.post('/register', registerUser);

export default router;
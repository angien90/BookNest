import { Router } from 'express';
import { loginUser, registerUser } from '../controller/authController';
import { verifyAccessToken } from '../middleware/verifyToken';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
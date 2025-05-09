import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controller/authController';
import { verifyAccessToken } from '../middleware/verifyToken';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected
router.post('/logout', verifyAccessToken, logoutUser);

export default router;
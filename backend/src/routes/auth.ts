import { Router } from 'express';
import { login, logout, refreshToken } from '../controllers/authController';
import { validateLogin, validateRefresh } from '../middlewares/validation';
import { jwtMiddleware } from '../middlewares/jwt';
import { rateLimiter } from '../middlewares/rateLimiter';

const router = Router();

// POST /api/auth/login
router.post('/login', rateLimiter, validateLogin, login);

// POST /api/auth/logout
router.post('/logout', rateLimiter, jwtMiddleware, logout);

// POST /api/auth/refresh-token
router.post('/refresh-token', rateLimiter, validateRefresh, refreshToken);

export default router; 
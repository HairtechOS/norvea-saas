import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  message: {
    error: 'RATE_LIMITED',
    message: 'Too many requests, please try again later.',
    code: 429,
  },
  standardHeaders: true,
  legacyHeaders: false,
}); 
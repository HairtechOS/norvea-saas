import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateLogin = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'VALIDATION_ERROR', message: errors.array(), code: 422 });
    }
    next();
  },
];

export const validateRefresh = [
  body('refreshToken').isString().notEmpty().withMessage('Refresh token is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'VALIDATION_ERROR', message: errors.array(), code: 422 });
    }
    next();
  },
]; 
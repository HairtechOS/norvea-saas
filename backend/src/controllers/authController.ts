import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';
import { AuthService } from '../services/authService';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password, req);
    // Audit log (succès)
    // ...
    res.status(200).json(result);
  } catch (error) {
    Sentry.captureException(error);
    // Audit log (échec)
    res.status(error.status || 401).json({ error: 'AUTH_ERROR', message: error.message, code: error.code || 401 });
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    await AuthService.logout(userId, req);
    // Audit log
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    Sentry.captureException(error);
    res.status(error.status || 400).json({ error: 'LOGOUT_ERROR', message: error.message, code: error.code || 400 });
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const result = await AuthService.refreshToken(refreshToken, req);
    // Audit log
    res.status(200).json(result);
  } catch (error) {
    Sentry.captureException(error);
    res.status(error.status || 401).json({ error: 'REFRESH_ERROR', message: error.message, code: error.code || 401 });
  }
}; 
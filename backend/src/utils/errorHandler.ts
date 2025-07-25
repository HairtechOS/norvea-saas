import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  Sentry.captureException(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.error || 'INTERNAL_ERROR',
    message: err.message || 'An unexpected error occurred',
    code: status,
  });
} 
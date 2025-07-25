import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import * as Sentry from '@sentry/node';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'NO_TOKEN', message: 'No JWT token provided', code: 401 });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    // Optionnel : recharger l'utilisateur depuis la base
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      return res.status(401).json({ error: 'INVALID_USER', message: 'User not found', code: 401 });
    }
    req.user = user;
    next();
  } catch (error) {
    Sentry.captureException(error);
    return res.status(401).json({ error: 'INVALID_TOKEN', message: 'Invalid or expired JWT', code: 401 });
  }
}; 
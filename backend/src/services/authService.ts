import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Redis from 'ioredis';
import * as Sentry from '@sentry/node';
import { Request } from 'express';

const prisma = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL || '');
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshsecret';
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '7d';

function auditLog(event: string, userId: string | null, req: Request, success: boolean, details?: any) {
  // À adapter : log en base, Sentry, ou fichier
  Sentry.addBreadcrumb({
    category: 'auth',
    message: `${event} - user: ${userId} - ip: ${req.ip} - ua: ${req.headers['user-agent']} - success: ${success}`,
    data: details,
    level: success ? 'info' : 'error',
  });
}

export const AuthService = {
  async login(email: string, password: string, req: Request) {
    const user = await prisma.user.findUnique({ where: { email }, include: { tenant: true } });
    if (!user) {
      auditLog('login', null, req, false, { reason: 'user_not_found' });
      throw new Error('Invalid credentials');
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      auditLog('login', user.id, req, false, { reason: 'bad_password' });
      throw new Error('Invalid credentials');
    }
    // Générer JWT
    const token = jwt.sign({ userId: user.id, tenantId: user.tenantId, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    // Générer refreshToken
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
    // Stocker refreshToken en Redis (blacklist possible)
    await redis.set(`refresh:${user.id}:${refreshToken}`, '1', 'EX', 7 * 24 * 60 * 60); // 7 jours
    auditLog('login', user.id, req, true);
    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        tenant: user.tenant,
      },
    };
  },

  async logout(userId: string, req: Request) {
    // Invalider tous les refreshTokens de l'utilisateur (optionnel : blacklist JWT)
    const keys = await redis.keys(`refresh:${userId}:*`);
    for (const key of keys) {
      await redis.del(key);
    }
    auditLog('logout', userId, req, true);
    return true;
  },

  async refreshToken(refreshToken: string, req: Request) {
    try {
      const payload = jwt.verify(refreshToken, REFRESH_SECRET) as any;
      // Vérifier que le refreshToken est encore valide en Redis
      const exists = await redis.get(`refresh:${payload.userId}:${refreshToken}`);
      if (!exists) {
        auditLog('refresh', payload.userId, req, false, { reason: 'refresh_token_invalid' });
        throw new Error('Invalid refresh token');
      }
      // Générer un nouveau JWT et un nouveau refreshToken (rotation)
      const user = await prisma.user.findUnique({ where: { id: payload.userId }, include: { tenant: true } });
      if (!user) throw new Error('User not found');
      const newToken = jwt.sign({ userId: user.id, tenantId: user.tenantId, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      const newRefreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
      // Invalider l'ancien refreshToken
      await redis.del(`refresh:${user.id}:${refreshToken}`);
      // Stocker le nouveau
      await redis.set(`refresh:${user.id}:${newRefreshToken}`, '1', 'EX', 7 * 24 * 60 * 60);
      auditLog('refresh', user.id, req, true);
      return {
        token: newToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          tenantId: user.tenantId,
          tenant: user.tenant,
        },
      };
    } catch (error) {
      Sentry.captureException(error);
      throw new Error('Invalid refresh token');
    }
  },
}; 
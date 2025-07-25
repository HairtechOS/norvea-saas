import request from 'supertest';
import app from '../src/app'; // Assure-toi que app exporte l'instance Express
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

let testUser: any;
let testTenant: any;
let jwtToken: string;
let refreshToken: string;

beforeAll(async () => {
  // Créer un tenant et un user de test
  testTenant = await prisma.tenant.create({
    data: {
      name: 'Test Salon',
      language: 'fr',
      currency: 'EUR',
      timezone: 'Europe/Paris',
    },
  });
  testUser = await prisma.user.create({
    data: {
      email: 'test@norvea.com',
      passwordHash: await bcrypt.hash('TestPassword123', 10),
      role: 'ADMIN',
      tenantId: testTenant.id,
    },
  });
});

afterAll(async () => {
  await prisma.user.deleteMany({ where: { tenantId: testTenant.id } });
  await prisma.tenant.delete({ where: { id: testTenant.id } });
  await prisma.$disconnect();
});

describe('Auth API', () => {
  it('should login successfully and return JWT/refreshToken', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@norvea.com', password: 'TestPassword123' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
    jwtToken = res.body.token;
    refreshToken = res.body.refreshToken;
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@norvea.com', password: 'WrongPassword' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('AUTH_ERROR');
  });

  it('should refresh token successfully', async () => {
    const res = await request(app)
      .post('/api/auth/refresh-token')
      .send({ refreshToken });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });

  it('should fail refresh with invalid token', async () => {
    const res = await request(app)
      .post('/api/auth/refresh-token')
      .send({ refreshToken: 'invalidtoken' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('REFRESH_ERROR');
  });

  it('should logout successfully', async () => {
    const res = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Logged out successfully');
  });

  it('should rate limit after too many requests', async () => {
    for (let i = 0; i < 101; i++) {
      await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@norvea.com', password: 'TestPassword123' });
    }
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@norvea.com', password: 'TestPassword123' });
    expect(res.status).toBe(429);
    expect(res.body.error).toBe('RATE_LIMITED');
  });
}); 
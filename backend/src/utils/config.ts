export const config = {
  jwtSecret: process.env.JWT_SECRET || 'changeme',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshSecret: process.env.REFRESH_SECRET || 'refreshsecret',
  refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
  redisUrl: process.env.REDIS_URL || '',
  sentryDsn: process.env.SENTRY_DSN || '',
}; 
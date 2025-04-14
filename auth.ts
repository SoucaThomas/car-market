import { betterAuth, boolean } from 'better-auth';
import { username } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient, Role } from '@prisma/client';
import { nextCookies } from 'better-auth/next-js';

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        enum: Object.values(Role),
        default: 'guest',
      },
      isActive: {
        type: 'boolean',
      },
      image: {
        type: 'string',
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username(), nextCookies()],
});

type Session = typeof auth.$Infer.Session;
type User = typeof auth.$Infer.Session.user;
export type { Session, User };

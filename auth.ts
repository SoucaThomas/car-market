import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "guest",
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

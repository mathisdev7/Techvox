import { env } from "@/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: any }) {
      session.user.id = user.id;
      return session as any;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      token.id = user.id;
      return token;
    },
  },
});

prisma.$disconnect();

import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";

const googleConfigured =
  Boolean(process.env.GOOGLE_CLIENT_ID?.length) &&
  Boolean(process.env.GOOGLE_CLIENT_SECRET?.length);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/auth/login",
  },
  providers: googleConfigured
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          allowDangerousEmailAccountLinking: true,
        }),
      ]
    : [
        CredentialsProvider({
          id: "oauth-not-configured",
          name: "OAuth",
          credentials: {},
          async authorize() {
            return null;
          },
        }),
      ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });
        if (dbUser) {
          (session as { role?: string }).role = dbUser.role;
        }
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const name = user.name ?? "";
      const parts = name.trim().split(/\s+/);
      const first = parts[0] ?? "User";
      const last = parts.slice(1).join(" ") || "";
      await prisma.user.update({
        where: { id: user.id },
        data: {
          firstName: first,
          lastName: last,
          image: user.image,
        },
      });
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

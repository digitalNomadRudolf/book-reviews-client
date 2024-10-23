import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt/types";
import { UserType } from "@/types/user";
import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import axiosInstance from "@/utils/axios";

declare module "next-auth/adapters" {
  interface AdapterUser extends UserType {}
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Find user & validate password
          const res = await axiosInstance.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data) {
            return res.data.user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: UserType }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const userObject: AdapterUser = {
        id: token.id as string,
        username: token.name ?? "",
        email: token.email ?? "",
        emailVerified: null,
      };

      if (token) {
        session.user = userObject;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };

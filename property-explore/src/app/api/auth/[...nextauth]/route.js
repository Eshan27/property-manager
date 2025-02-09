import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export const authOptions = {
  pages: {
    signIn: "/login"
  },
  providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

  
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return user;
          }
          throw new Error("Invalid credentials");
        },
      }),
    ],
    callbacks: {
      jwt({token, user}) {
        if(user) {
          token.user = user
        }

        return token
      },
      session({ session, token }) {
        if (token?.user) {
          session.user.role = token.user.role;
        }
        return session;
      },
    },   
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
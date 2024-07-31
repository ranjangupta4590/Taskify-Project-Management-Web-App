import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getGravatarUrl } from "@/lib/gravatar";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token }) {
      await connectMongoDB();
      const user = await User.findOne({ email: token.email });

      if (user) {
        session.user.image = getGravatarUrl(user.email); // Use Gravatar URL
        // console.log("Session user:", session.user); // Log the session user
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email; // Store email in the token
      }

      return token;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

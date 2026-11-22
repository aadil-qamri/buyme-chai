import NextAuth from 'next-auth';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from '@/models/User';
import connectDB from '@/db/connectDB';

export const authOptions = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github' || account.provider === 'google') {
        try {
          await connectDB();
          const currentUser = await User.findOne({ email: user.email });
          if (!currentUser) {
            await User.create({
              email: user.email,
              username: user.email.split("@")[0],
            });
          }
          return true;
        } catch (err) {
          console.error("SignIn error:", err);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      try {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username;
        }
      } catch (err) {
        console.error("Session error:", err);
      }
      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
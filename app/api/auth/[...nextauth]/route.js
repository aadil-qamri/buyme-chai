import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from "next-auth/providers/github"
import mongoose from 'mongoose';
import User from '@/models/User';
import connectDB from '@/db/connectDB';
import Payment from '@/models/Payment';


export const authOptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == 'github') {
        await connectDB()
        // Check user already exists
        const currentUser = await User.findOne({email: email})
        if(!currentUser){
          // Create New User
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          })
        }
        return true
      }
    },
     async session({ session, user, token }) {
      const dbUser = await User.findOne({email : session.user.email})
      session.user.name = dbUser.username
      return session
    },
  }
 

})

export { authOptions as GET, authOptions as POST }
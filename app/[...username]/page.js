"use server"
import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import User from '@/models/User';
import connectDB from '@/db/connectDB';
import { notFound } from "next/navigation";


export default async function Username({ params }) {
  const rParams = await params
    await connectDB()
    let u = await User.findOne({ username: rParams.username })
    if (!u) {
      return notFound()
    }
  return (
  <PaymentPage username={rParams.username}/>
  )
}

export async function generateMetadata({params}) {
  const rParams = await params
  return {
    title: `${rParams.username} - Get Me A Chai `,
  }
}

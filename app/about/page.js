import React from 'react'

const About = () => {
  return (
    <>
      <div className="max-w-3xl mx-auto py-12 px-6 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

      <p className="mb-4 text-lg">
        Welcome to <span className="font-semibold text-green-400">BuyMeAChai</span>, 
        a simple crowdfunding platform built to help creators, developers, and dreamers 
        get support from their community. Instead of large fundraising campaigns, 
        supporters can contribute small amounts – like buying someone a chai – 
        to show appreciation for their work.
      </p>

      <p className="mb-4 text-lg">
        Whether you are an artist, developer, writer, or content creator, 
        this platform gives you a personal page where supporters can 
        leave donations, messages, and encouragement.
      </p>

      <p className="mb-4 text-lg">
        Every contribution, no matter how small, makes a difference. 
        Our goal is to empower creators by giving them an easy way 
        to be supported by the people who value their work.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
      <ul className="list-disc pl-6 space-y-2 text-lg">
        <li>Create your profile and share your unique page link.</li>
        <li>Supporters can send contributions securely using Razorpay.</li>
        <li>Messages of encouragement are shared publicly on your page.</li>
        <li>Track your total supporters, payments, and donations in real time.</li>
      </ul>

      <p className="mt-8 text-center text-lg text-gray-400">
        Together, we are building a community where small acts of kindness 
        fuel big dreams. 💚
      </p>
    </div>
    </>
  )
}

export default About

export const metadata = {
    title: "Login - Get Me A Chai"
}

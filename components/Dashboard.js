"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchUser, updatedUser } from '@/components/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import { Flip } from "react-toastify";

const Dashboard = () => {
  const [form, setform] = useState({})
  const router = useRouter();
  const { data: session, update } = useSession();

  useEffect(() => {
    const getData = async () => {
      if (!session?.user?.name) return; // no session yet
      let user = await fetchUser(session.user.name);
      setform(user);
    };

    getData();

    if (!session) {
      router.push('/login');
    }
  }, [session, router]); // no more missing dependency warning



  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    let a = await updatedUser(e, session.user.name)
    toast.info('Profile Updated', {
      position: "top-right",
      autoClose: 1590,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1590}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      <div className="container mx-auto p-5">
        <h1 className='text-center my-5 text-3xl font-bold'>Welcome To Your Dashboard</h1>
        <form className='max-w-2xl mx-auto' action={handleSubmit}>
          <div className="my-2">
            {/* input for name */}
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input value={form.name ? form.name : ""} onChange={handlechange} type='text' name='name' id='name' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          </div>
          <div className="my-2">
            {/* input for email */}
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input value={form.email ? form.email : ""} onChange={handlechange} type='text' name='email' id='email' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          </div>
          <div className="my-2">
            {/* input for username */}
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input value={form.username ? form.username : ""} onChange={handlechange} type='text' name='username' id='username' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          </div>
          <div className="my-2">
            {/* input for profile pic of input type text */}
            <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
            <input value={form.profilepic ? form.profilepic : ""} onChange={handlechange} type='text' name='profilepic' id='profilepic' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          </div>
          <div className="my-2">
            {/* input for cover picture */}
            <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
            <input value={form.coverpic ? form.coverpic : ""} onChange={handlechange} type='text' name='coverpic' id='coverpic' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          </div>
          <div className="my-2">
            {/* input for Razorpay ID */}
            <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay ID</label>
            <input value={form.razorpayid ? form.razorpayid : ""} onChange={handlechange} type='text' name='razorpayid' id='razorpayid' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          </div>
          <div className="my-2">
            {/* input for Razorpay Secret */}
            <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
            <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handlechange} type='text' name='razorpaysecret' id='razorpaysecret' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
          </div>
          <div className="my-6">
            <button type="submit" className='block w-full items-center p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm'>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Dashboard
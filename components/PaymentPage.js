"use client"
import React, { useState, useEffect , useCallback } from "react";
import Script from "next/script";
import Image from "next/image";
import { fetchUser, fetchPayments } from "./actions/useractions";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import { Flip } from "react-toastify";
import { useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentuser, setcurrentuser] = useState({})
  const [payment, setpayment] = useState([])
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast.info('Payment Successful', {
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
    getData()
    router.replace(`/${username}`)
  }, [searchParams]);



  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = useCallback(async () => {
  let user = await fetchUser(username);
  setcurrentuser(user);
  let dbpayment = await fetchPayments(username);
  setpayment(dbpayment);
}, [username]);




  const pay = async (amount) => {
    const res = await fetch("/api/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        to_username: username,
        paymentform,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error('Payment Failed', {
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
      return;
    }

    const { orderId, amount: orderAmount, currency } = data;

    const options = {
      key: currentuser.razorpayid,
      amount: orderAmount, // amount from backend (already in paise)
      currency,
      name: "BuyMeAChai",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: "https://buyme-chai.vercel.app/api/razorpay",
      prefill: {
        name: paymentform.name,
        email: "gaurav.kumar@example.com",
        contact: "+919876543210",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="cover w-full relative">
        <img
          className="object-cover w-full h-36 md:h-[350]"
          src={currentuser.coverpic}
          alt=""
        />
        <div className="flex justify-center">
          <img
            className="shadow shadow-gray-700 rounded-lg"
            width={100}
            height={100}
            src={currentuser.profilepic}
            alt="Profile"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center info my-5 gap-2">
        <div className="font-bold text-xl">@{username}</div>
        <div>PERMISSION BY AzureGigacyber</div>
        <div className="text-slate-400">
          {payment.length} Payments &bull; ₹{payment.reduce((a, b) => a + b.amount, 0) || 0} Raised &bull; {[...new Set(payment.map(p => p.name))].length} Supporters
        </div>

        <div className="payment flex flex-col md:flex-row gap-3 w-[80%] mt-6">
          {/* supporters box */}
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-5">
            <h2 className="text-xl text-white text-center font-bold my-5">
              Supporters
            </h2>
            {/* Dynamic List */}
            <ul className="mx-auto flex flex-col justify-center items-center text-lg">
              {payment.length == 0 && <li className="my-4 flex gap-2 items-center">No Payments Yet</li>}
              {payment.slice(0, 5).map((p, i) => {
                return <li key={i} className="my-4 flex gap-2 items-center">
                  <Image width={33} height={33} src="avatar.gif" alt="" />
                  <span>{`${p.name} donated ₹${p.amount} with Message "${p.message}"`}</span>
                </li>
              })}
            </ul>
          </div>

          {/* payment box */}
          <div className="makePayment w-full md:w-1/2 bg-slate-900 text-white rounded-lg p-5">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input onChange={handleChange} name="name" value={paymentform.name} type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Name" />
              <input
                onChange={handleChange} name="message" value={paymentform.message} type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Message" />
              <input
                onChange={handleChange} name="amount" value={paymentform.amount} type="number" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Amount" />
              <button type="button" onClick={() => pay(paymentform.amount)} className="text-white disabled:from-slate-800 bg-gradient-to-r from-green-400 enabled:via-green-500 enabled:to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5" disabled={paymentform.name.length <= 3 || paymentform.message.length <= 4 || paymentform.amount?.length < 1}>Pay</button>
            </div>

            {/* quick select buttons */}
            <div className="flex flex-col md:flex-row gap-2 mt-5">
              <button className="p-3 rounded-lg bg-slate-800" onClick={() => pay(10)}>Pay ₹10</button>
              <button className="p-3 rounded-lg bg-slate-800" onClick={() => pay(15)}>Pay ₹15</button>
              <button className="p-3 rounded-lg bg-slate-800" onClick={() => pay(20)}>Pay ₹20</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;

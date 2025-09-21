import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/models/User";


export const POST = async (req) => {
  try {
    await connectDB();

    // Razorpay sends form data, not JSON
    let formData = await req.formData();
    let body = Object.fromEntries(formData);

    // Check if order exists
    const payment = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!payment) {
      return NextResponse.json(
        { success: false, message: "Order ID Not Found" },
        { status: 400 }
      );
    }
    // Fetch User Razorpay Credentials
    let user = await User.findOne({username: payment.to_user})
    const secret = user.razorpaysecret


    // Verify payment
    const verified = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      secret
    );

    if (verified) {
      const updatedPayment = await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: true },
        { new: true }
      );

      // Redirect user back to username page
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_HOST}/${updatedPayment.to_user}?paymentdone=true`,
        { status: 303 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Payment Verification Failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Unknown Error" },
      { status: 502 }
    );
  }
};

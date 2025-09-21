"use server"
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/db/connectDB";

const initiate = async (amount, to_username, paymentform) => {
    try {
        await connectDB();
         // Fetch User Razorpay Credentials
        let user = await User.findOne({username: to_username})
        const userid = user.razorpayid
        const secret = user.razorpaysecret

        // Create Razorpay instance
        const instance = new Razorpay({
            key_id: userid,
            key_secret: secret,
        });

        // Create order with dynamic amount
        const options = {
            amount: Number.parseInt(amount) * 100, // amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`, // unique receipt
            notes: {
                name: paymentform.name,
                message: paymentform.message,
            },
        };

        const order = await instance.orders.create(options);

        // Save order details in DB
        await Payment.create({
            oid: order.id,
            amount: amount,
            to_user: Array.isArray(to_username) ? to_username[0] : to_username,
            name: paymentform.name,
            message: paymentform.message,
        });

        return order;
    } catch (err) {
        console.error("Payment initiation error:", err);
        throw new Error("Payment initiation failed");
    }
};

export default initiate;

export const fetchUser = async (username) => {
    await connectDB();
    let user = await User.findOne({ username: username })
    let nxuser = user.toObject({ flattenObjectIds: true })
    return JSON.parse(JSON.stringify(nxuser));
}

export const fetchPayments = async (username) => {
    await connectDB();
    let payment = await Payment.find({ to_user: username ,done: true }).sort({ amount: -1 }).lean()
    return JSON.parse(JSON.stringify(payment));
}

export const updatedUser = async (data, oldusername) => {
    await connectDB()
    let nwdata = Object.fromEntries(data)

    if (oldusername !== nwdata.username) {
        let user = await User.findOne({ username: nwdata.username })
        if (user) {
            return { error: "Username already exists" }
        }
        await User.updateOne({email: nwdata.email}, nwdata)
        // Now Update Username in Payments Table
        await Payment.updateMany({to_user: oldusername}, {to_user: nwdata.username})
    }
    else { 
        await User.updateOne({email: nwdata.email}, nwdata)
    }

}





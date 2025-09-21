// import { NextResponse } from "next/server";
// import connectDB from "@/db/connectDB";
// import Payment from "@/models/Payment";

// export async function GET() {
//   try {
//     await connectDB();

//     const payments = await Payment.find();

//     let updated = 0;
//     for (let p of payments) {
//       if (typeof p.amount === "string") {
//         p.amount = Number(p.amount);
//         await p.save();
//         updated++;
//       }
//     }

//     return NextResponse.json({
//       message: "Migration complete ✅",
//       updated,
//     });
//   } catch (error) {
//     console.error("Migration error:", error);
//     return NextResponse.json({ error: "Migration failed ❌" }, { status: 500 });
//   }
// }

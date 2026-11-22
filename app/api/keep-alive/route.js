import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import mongoose from "mongoose";

export async function GET(request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("CRON_SECRET is not configured");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    // Ping the database to keep the connection alive
    await mongoose.connection.db.command({ ping: 1 });

    return NextResponse.json({
      ok: true,
      message: "Database pinged successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Keep-alive error:", error);

    return NextResponse.json(
      { ok: false, error: "Database ping failed" },
      { status: 500 }
    );
  }
}

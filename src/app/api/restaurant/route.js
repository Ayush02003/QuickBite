import Restaurant from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";

export async function GET() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr);
  }

  const data = await Restaurant.find();
  return NextResponse.json({ result: true, data });
}

export async function POST(request) {
  try {
    let payload = await request.json();
    let result;
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
    }

    if (payload.login) {
      result = await Restaurant.findOne({
        email: payload.email,
        password: payload.password,
      });
    } else {
      const existingUser = await Restaurant.findOne({ email: payload.email });
      if (existingUser) {
        return NextResponse.json({
          success: false,
          message: "Email already registered",
        });
      }
      result = await Restaurant.create(payload);
    }
    if (!result) {
      return NextResponse.json({ success: false, result });
    }
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

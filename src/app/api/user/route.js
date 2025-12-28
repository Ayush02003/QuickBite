import mongoose from "mongoose";
import { userSchema } from "@/app/lib/userModel";

import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
export async function POST(request) {
  try {
    let payload = await request.json();
    let result;
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
    }

    if (payload.login) {
      result = await userSchema.findOne({
        email: payload.email,
        password: payload.password,
      });
    } else {
      const existingUser = await userSchema.findOne({ email: payload.email });
      if (existingUser) {
        return NextResponse.json({
          success: false,
          result: "Email already registered !",
        });
      }

      result = await userSchema.create(payload);
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

import mongoose from "mongoose";
import { deliveryPartnersSchema } from "@/app/lib/deliveryPartnersModel";

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
      result = await deliveryPartnersSchema.findOne({
        mobile: payload.mobile,
        password: payload.password,
      });
    } else {
      const existingUser = await deliveryPartnersSchema.findOne({ mobile: payload.mobile });
      if (existingUser) {
        return NextResponse.json({
          success: false,
          result: "Email already registered !",
        });
      }

      result = await deliveryPartnersSchema.create(payload);
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

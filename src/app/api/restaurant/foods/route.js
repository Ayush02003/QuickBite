import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
    }

    const food = new foodSchema(payload);
    const result = await food.save();

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("POST Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save food item",
      },
      { status: 500 }
    );
  }
}

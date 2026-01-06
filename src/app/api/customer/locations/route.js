import { connectionStr } from "@/app/lib/db";
import Restaurant from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await mongoose.connect(connectionStr);
  let result = await Restaurant.find();

  result = result.map(
    (item) => item.city.charAt(0).toUpperCase() + item.city.slice(1).toLowerCase()
  );
  result = [...new Set(result.map((item) => item))].sort();
//   console.log(result)
  
  return NextResponse.json({ success: result.length>0, result });
}

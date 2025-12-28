import { connectionStr } from "@/app/lib/db";
import Restaurant from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  let queryParams = request.nextUrl.searchParams;
  await mongoose.connect(connectionStr);
  let filter = {};
  if (queryParams.get("location")) {
    let loc = queryParams.get("location");
    filter = { city: { $regex: new RegExp(loc, "i") } };
  } else if (queryParams.get("restaurant")) {
    let loc = queryParams.get("restaurant");
    filter = { restaurantName: { $regex: new RegExp(loc, "i") } };
  }
  let result = await Restaurant.find(filter);
  return NextResponse.json({ success: true, result });
}

import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const {id} = await content.params;
  let success;
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr);
  }
  const result = await foodSchema.findOne({ _id: id });
  success = result !== null
  return NextResponse.json({ result, success });
}

export async function PUT(request,content){
  const {id} = await content.params;
  const payload = await request.json()
   let success = false;
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr);
  }
  const result = await foodSchema.findOneAndUpdate({_id:id},payload)
  if(result){
    success=true
  }
  return NextResponse.json({result,success})
}
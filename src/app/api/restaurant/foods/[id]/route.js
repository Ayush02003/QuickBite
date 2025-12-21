import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
  const { id } = await params;

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr);
  }

  const result = await foodSchema.find({ resto_id: id });

  const success = result.length > 0;

  return NextResponse.json({ result, success });
}

export async function DELETE (request,content){
  const {id} = await content.params
  if(mongoose.connection.readyState ===0){
    await mongoose.connect(connectionStr)
  }
  const result = await foodSchema.deleteOne({ _id: id });

    const success = result.deletedCount > 0;

  return NextResponse.json({ result, success });

}

import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodsModel"
import Restaurant from "@/app/lib/restaurantsModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request,content){
    const {id} = await content.params
    await mongoose.connect(connectionStr)
    const details = await Restaurant.findOne({_id:id}) 
    const foodItems = await foodSchema.find({resto_id:id})
    return NextResponse.json({success:true,details,foodItems})
}
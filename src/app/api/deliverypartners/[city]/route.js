    import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliveryPartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

    export async function GET(request,content){
        let {city} = await content.params
        let success = false;
        await mongoose.connect(connectionStr)
        let filter = {city:{$regex:new RegExp(city,'i')}}
        const result = await deliveryPartnersSchema.find(filter)
        return NextResponse.json({result})
    }

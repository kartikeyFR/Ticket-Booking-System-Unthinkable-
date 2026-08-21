import mongoose from "mongoose";

const waitListSchema=new mongoose.Schema({
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    category:{
        type:String,
        required:true,
        
    },
    status:{
        type:String,
        enum:['waiting','offered','expired','booked'],
        default:'waiting'
    },
    offeredSeatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seat",
        required:false
    },
    offerExpiresAt:{
        type:Date,
        required:false
    }
},{timestamps:true})

export const Waitlist=mongoose.model("Waitlist",waitListSchema)


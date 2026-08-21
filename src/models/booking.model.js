import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
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
    seatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seat",
        required:true
    },
    ticketNumber:{
        type:String,
        required:true,
        unique:true
    },
    qrCodeData:{
        type:String,
        required:true
    }

},{timestamps:true})

export const Booking=mongoose.model("Booking",bookingSchema)
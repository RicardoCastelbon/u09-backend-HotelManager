import mongoose, { Schema, model, ObjectId } from "mongoose";

interface Booking {
  hotel: ObjectId;
  roomType: string;
  checkin: String;
  checkout: String;
  price: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
}

const BookingSchema = new Schema<Booking>(
  {
    hotel: {
      type: mongoose.Types.ObjectId,
      ref: "Hotel",
    },
    roomType: {
      type: String,
      enum: ["single", "double", "triple"],
      default: "single",
    },
    checkin: {
      type: String,
    },
    checkout: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Please provide the toom price"],
    },
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide phone number"],
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "checkedIn", "checkedOut"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

export default model<Booking>("Booking", BookingSchema);

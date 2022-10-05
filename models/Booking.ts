import mongoose, { Schema, model, ObjectId } from "mongoose";

interface Booking {
  hotel: ObjectId;
  typeOfRoom: string;
  checkin: Date;
  checkout: Date;
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
    typeOfRoom: {
      type: String,
    },
    checkin: {
      type: Date,
    },
    checkout: {
      type: Date,
    },
    price: {
      type: Number,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
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

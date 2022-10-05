import mongoose, { Schema, model, ObjectId } from "mongoose";

interface Hotel {
  name: string;
  address: string;
  floors: number;
  roomsPerFloor: number;
  singleRooms: number;
  doubleRooms: number;
}

const HotelSchema = new Schema<Hotel>(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    floors: {
      type: Number,
    },
    roomsPerFloor: {
      type: Number,
    },
    singleRooms: {
      type: Number,
    },
    doubleRooms: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default model<Hotel>("Hotel", HotelSchema);

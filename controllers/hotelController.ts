import { StatusCodes } from "http-status-codes";
import Hotel from "../models/Hotel";
import { BadRequestError, UnAuthenticatedError } from "../errors";
import User from "../models/User";

const createHotel = async (req: any, res: any) => {
  const { name, address, floors, roomsPerFloor, singleRooms, doubleRooms } =
    req.body;

  if (
    !name ||
    !address ||
    !floors ||
    !roomsPerFloor ||
    !singleRooms ||
    !doubleRooms
  ) {
    throw new BadRequestError("Please provide all values");
  }
  /* const hotelExists = await Hotel.findOne({ name });
  if (hotelExists) {
    throw new BadRequestError("Hotel already exists");
  } */

  const hotel = await Hotel.create({
    name,
    address,
    floors,
    roomsPerFloor,
    singleRooms,
    doubleRooms,
  });

  //I have the userId of the user loged in. Need to update the User logged in
  // and add the hotel that belongs to
  const user = User.findById(req.user.userId);

  const updateDocument = {
    $set: {
      hotel: 4534543
    },
  };

  const insertHotel = await User.updateOne(user, updateDocument);

  res.status(StatusCodes.CREATED).json({ hotel, insertHotel });
};

const updateHotel = async (req: any, res: any) => {
  res.send("Update Hotel");
};

export { createHotel, updateHotel };

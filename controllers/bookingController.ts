import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import Booking from "../models/Booking";
import checkPermissions from "../utils/checkPermissions";

const createBooking = async (req: any, res: any) => {
  const {
    roomType,
    checkin,
    checkout,
    price,
    firstName,
    lastName,
    email,
    phone,
    status,
  } = req.body;

  if (
    !roomType ||
    !checkin ||
    !checkout ||
    !price ||
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !status
  ) {
    throw new BadRequestError("Please provide all values");
  }

  //model property = user that is logged in
  req.body.user = req.user.userId;

  const booking = await Booking.create(req.body);
  res.status(StatusCodes.CREATED).json({ booking });
};

const getAllBookings = async (req: any, res: any) => {
  const bookings = await Booking.find({ user: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ bookings, totalBookings: bookings.length, numOfPages: 1 });
};

const updateBooking = async (req: any, res: any) => {
  const { id: bookingId } = req.params;
  const {
    roomType,
    checkin,
    checkout,
    price,
    firstName,
    lastName,
    email,
    phone,
    status,
  } = req.body;

  if (
    !roomType ||
    !checkin ||
    !checkout ||
    !price ||
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !status
  ) {
    throw new BadRequestError("Please provide all values");
  }

  const booking = await Booking.findOne({ _id: bookingId });

  if (!booking) {
    throw new NotFoundError(`No booking with id ${bookingId}`);
  }

  console.log(typeof req.user.userId);
  console.log(typeof booking.user);

  checkPermissions(req.user, booking.user);

  const updatedBooking = await Booking.findOneAndUpdate(
    { _id: bookingId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ updatedBooking });
};

const deleteBooking = async (req: any, res: any) => {
  res.send("Delete one Booking");
};

export { createBooking, getAllBookings, updateBooking, deleteBooking };

import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import Booking from "../models/Booking";

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
  res.send("Get all Bookings");
};

const getOneBooking = async (req: any, res: any) => {
  res.send("Get one Booking");
};

const updateBooking = async (req: any, res: any) => {
  res.send("Update Booking");
};

const deleteBooking = async (req: any, res: any) => {
  res.send("Delete one Booking");
};

export {
  createBooking,
  getAllBookings,
  getOneBooking,
  updateBooking,
  deleteBooking,
};

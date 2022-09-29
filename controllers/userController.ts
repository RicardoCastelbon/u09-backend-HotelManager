import User from "../models/User";
import { StatusCodes } from "http-status-codes";

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "employee" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

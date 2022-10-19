import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import createTokenUser from "../utils/createTokenUser";
import { attachCookiesToResponse } from "../utils/jwt";
import { BadRequestError, UnAuthenticatedError } from "../errors";

const register = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError("Email already in use");
  }

  //Checks if is the first account and makes it admin in that case
  /* const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "employee"; */

  //user creation
  const user = await User.create({
    name,
    email,
    password,
    role: "admin",
  });
  //token creation
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  //checks if user is registered
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  } else {
    //checks if the password is correct
    const isPassCorrect = await user.comparePassword(password);
    if (!isPassCorrect) {
      throw new UnAuthenticatedError("Invalid Credentials");
    }

    //token creation
    const tokenUser = createTokenUser(user);

    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({ user: tokenUser });
  }
};

const logout = async (req: any, res: any) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};

const updateUser = async (req: any, res: any) => {
  const { email, name, lastName } = req.body;
  if (!name || !email || !lastName) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  if (user) {
    user.email = email;
    user.name = name;
    user.lastName = lastName;

    await user.save();

    //token creation
    const tokenUser = createTokenUser(user);

    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  }
};

const updateUserPassword = async (req: any, res: any) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  if (user) {
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError("Invalid Credentials");
    }
    user.password = newPassword;

    await user.save();
    res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
  }
};

export { register, login, logout, updateUser };

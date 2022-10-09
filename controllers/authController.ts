import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import createTokenUser from "../utils/createTokenUser";
import attachCookiesToResponse from "../utils/jwt";
import { BadRequestError } from "../errors";

const register = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError("Email already in use");
  }

  //user creation
  const user = await User.create({ name, email, password });
  //token creation
  const tokenUser = createTokenUser(user);
  console.log(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  //checks if user is registered
  const user = await User.findOne({ email });
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Email not found" });
  } else {
    //checks if the password is correct
    const isPassCorrect = await user.comparePassword(password);
    if (!isPassCorrect) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Wrong password" });
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

export { register, login, logout };

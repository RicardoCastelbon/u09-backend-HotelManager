import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import createTokenUser from "../utils/createTokenUser";
import attachCookiesToResponse from "../utils/jwt";

const register = async (req: any, res: any) => {
  const { name, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error("Email already exists");
  }

  //user creation
  const user = await User.create({ name, email, password });
  //token creation
  const tokenUser = createTokenUser(user);
  console.log(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

module.exports = { register };

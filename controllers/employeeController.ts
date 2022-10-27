import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors";

const createEmployee = async (req: any, res: any) => {
  const { name, email, password, lastName, salary } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError("Email already in use");
  }

  if (req.user && req.user.role == "admin") {
    req.body.admin = req.user.userId;

    console.log(req.body.admin);

    //user creation
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        salary: user.salary,
        role: user.role,
      },
    });
  }
};

const getAllEmployees = async (req: any, res: any) => {
  const employees = await User.find({ admin: req.user.userId });
  res.status(StatusCodes.OK).json({ employees });
};

const updateEmployee = async (req: any, res: any) => {
  res.send("Update employee");
};

const deleteEmployee = async (req: any, res: any) => {
  res.send("Delete employee");
};

export { createEmployee, getAllEmployees, updateEmployee, deleteEmployee };

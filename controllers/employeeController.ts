import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors";
import checkPermissions from "../utils/checkPermissions";
import { UnauthorizedError } from "../errors";

const createEmployee = async (req, res) => {
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

const getAllEmployees = async (req, res) => {
  const employees = await User.find({ admin: req.user.userId });
  res.status(StatusCodes.OK).json({ employees });
};

const updateEmployee = async (req, res) => {
  const { id: employeeId } = req.params;
  const { name, email, password, lastName, salary } = req.body;

  if (!name || !email || !password || !lastName || !salary) {
    throw new BadRequestError("Please provide all values");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError("Email already in use");
  }

  if (req.user && req.user.role == "admin") {
    req.body.admin = req.user.userId;

    console.log(req.body.admin);

    const employee = await User.findOne({ _id: employeeId });

    if (!employee) {
      throw new NotFoundError(`No booking with id ${employeeId}`);
    }

    checkPermissions(req.user, employee.admin);

    if (employee.role === "admin") {
      throw new UnauthorizedError("Not authorized to access this route");
    }

    const updatedEmployee = await User.findOneAndUpdate(
      { _id: employeeId },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ updateEmployee });
  }
};

const deleteEmployee = async (req, res) => {
  const { id: employeeId } = req.params;

  const employee = await User.findOne({ _id: employeeId });

  if (!employee) {
    throw new NotFoundError(`No employee with id ${employeeId}`);
  }

  checkPermissions(req.user, employee.admin);

  if (employee.role === "admin") {
    throw new UnauthorizedError("Not authorized to access this route");
  }

  await employee?.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Booking removed" });
};

export { createEmployee, getAllEmployees, updateEmployee, deleteEmployee };

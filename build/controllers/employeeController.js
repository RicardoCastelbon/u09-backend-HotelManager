"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getAllEmployees = exports.createEmployee = void 0;
const User_1 = __importDefault(require("../models/User"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const checkPermissions_1 = __importDefault(require("../utils/checkPermissions"));
const errors_2 = require("../errors");
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, lastName, salary } = req.body;
    if (!name || !email || !password) {
        throw new errors_1.BadRequestError("Please provide all values");
    }
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        throw new errors_1.BadRequestError("Email already in use");
    }
    if (req.user && req.user.role == "admin") {
        req.body.admin = req.user.userId;
        console.log(req.body.admin);
        //user creation
        const user = yield User_1.default.create(req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            user: {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                salary: user.salary,
                role: user.role,
            },
        });
    }
});
exports.createEmployee = createEmployee;
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield User_1.default.find({ admin: req.user.userId });
    res.status(http_status_codes_1.StatusCodes.OK).json({ employees });
});
exports.getAllEmployees = getAllEmployees;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Update employee");
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: employeeId } = req.params;
    const employee = yield User_1.default.findOne({ _id: employeeId });
    if (!employee) {
        throw new errors_1.NotFoundError(`No employee with id ${employeeId}`);
    }
    (0, checkPermissions_1.default)(req.user, employee.admin);
    if (employee.role === "admin") {
        throw new errors_2.UnauthorizedError("Not authorized to access this route");
    }
    yield (employee === null || employee === void 0 ? void 0 : employee.remove());
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! Booking removed" });
});
exports.deleteEmployee = deleteEmployee;

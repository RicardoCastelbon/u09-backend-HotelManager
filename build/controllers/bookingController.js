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
exports.deleteBooking = exports.updateBooking = exports.getAllBookings = exports.createBooking = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const Booking_1 = __importDefault(require("../models/Booking"));
const checkPermissions_1 = __importDefault(require("../utils/checkPermissions"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomType, checkin, checkout, price, firstName, lastName, email, phone, status, } = req.body;
    if (!roomType ||
        !checkin ||
        !checkout ||
        !price ||
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !status) {
        throw new errors_1.BadRequestError("Please provide all values");
    }
    console.log(req.user);
    if (req.user.adminId) {
        req.body.user = req.user.adminId;
    }
    else {
        //model property = user that is logged in
        req.body.user = req.user.userId;
    }
    const booking = yield Booking_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ booking });
});
exports.createBooking = createBooking;
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, status, sort } = req.query;
    let queryObject;
    if (req.user.adminId) {
        queryObject = {
            user: req.user.adminId,
        };
    }
    else {
        queryObject = {
            user: req.user.userId,
        };
    }
    if (status && status !== "all") {
        queryObject.status = status;
    }
    if (search) {
        queryObject.lastName = { $regex: search, $options: "i" };
    }
    let result = Booking_1.default.find(queryObject);
    //short conditions
    if (sort === "latest") {
        result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
        result = result.sort("createdAt");
    }
    if (sort === "a-z") {
        result = result.sort("lastName");
    }
    if (sort === "z-a") {
        result = result.sort("-lastName");
    }
    const bookings = yield result;
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ bookings, totalBookings: bookings.length, numOfPages: 1 });
});
exports.getAllBookings = getAllBookings;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: bookingId } = req.params;
    const { roomType, checkin, checkout, price, firstName, lastName, email, phone, status, } = req.body;
    if (!roomType ||
        !checkin ||
        !checkout ||
        !price ||
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !status) {
        throw new errors_1.BadRequestError("Please provide all values");
    }
    const booking = yield Booking_1.default.findOne({ _id: bookingId });
    if (!booking) {
        throw new errors_1.NotFoundError(`No booking with id ${bookingId}`);
    }
    (0, checkPermissions_1.default)(req.user, booking.user);
    const updatedBooking = yield Booking_1.default.findOneAndUpdate({ _id: bookingId }, req.body, { new: true, runValidators: true });
    res.status(http_status_codes_1.StatusCodes.OK).json({ updatedBooking });
});
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: bookingId } = req.params;
    const booking = yield Booking_1.default.findOne({ _id: bookingId });
    if (!booking) {
        throw new errors_1.NotFoundError(`No booking with id ${bookingId}`);
    }
    (0, checkPermissions_1.default)(req.user, booking.user);
    yield booking.remove();
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! Booking removed" });
});
exports.deleteBooking = deleteBooking;

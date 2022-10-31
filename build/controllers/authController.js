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
exports.updateUser = exports.logout = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const http_status_codes_1 = require("http-status-codes");
const createTokenUser_1 = __importDefault(require("../utils/createTokenUser"));
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../errors");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new errors_1.BadRequestError("Please provide all values");
    }
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        throw new errors_1.BadRequestError("Email already in use");
    }
    //Checks if is the first account and makes it admin in that case
    /* const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "employee"; */
    //user creation
    const user = yield User_1.default.create({
        name,
        email,
        password,
        role: "admin",
    });
    //token creation
    const tokenUser = (0, createTokenUser_1.default)(user);
    (0, jwt_1.attachCookiesToResponse)({ res, user: tokenUser });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: tokenUser });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide all values");
    }
    //checks if user is registered
    const user = yield User_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new errors_1.UnAuthenticatedError("Invalid Credentials");
    }
    else {
        //checks if the password is correct
        const isPassCorrect = yield user.comparePassword(password);
        if (!isPassCorrect) {
            throw new errors_1.UnAuthenticatedError("Invalid Credentials");
        }
        //token creation
        const tokenUser = (0, createTokenUser_1.default)(user);
        (0, jwt_1.attachCookiesToResponse)({ res, user: tokenUser });
        res.status(http_status_codes_1.StatusCodes.OK).json({ user: tokenUser });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "User logged out" });
});
exports.logout = logout;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, lastName } = req.body;
    if (!name || !email || !lastName) {
        throw new errors_1.BadRequestError("Please provide all values");
    }
    const user = yield User_1.default.findOne({ _id: req.user.userId });
    if (user) {
        user.email = email;
        user.name = name;
        user.lastName = lastName;
        yield user.save();
        //token creation
        const tokenUser = (0, createTokenUser_1.default)(user);
        (0, jwt_1.attachCookiesToResponse)({ res, user: tokenUser });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: tokenUser });
    }
});
exports.updateUser = updateUser;
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new errors_1.BadRequestError("Please provide both values");
    }
    const user = yield User_1.default.findOne({ _id: req.user.userId });
    if (user) {
        const isPasswordCorrect = yield user.comparePassword(oldPassword);
        if (!isPasswordCorrect) {
            throw new errors_1.UnAuthenticatedError("Invalid Credentials");
        }
        user.password = newPassword;
        yield user.save();
        res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! Password Updated." });
    }
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenValid = exports.attachCookiesToResponse = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = ({ payload }) => {
    const token = jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};
const isTokenValid = ({ token }) => {
    return jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
};
exports.isTokenValid = isTokenValid;
const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user });
    //send token via cookie
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        //if the project is in production can send cookies in https only
        //secure: process.env.NODE_ENV === "production",
        secure: true,
        signed: true,
        sameSite: 'none',
    });
};
exports.attachCookiesToResponse = attachCookiesToResponse;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = exports.authenticateUser = void 0;
const errors_1 = require("../errors");
const jwt_1 = require("../utils/jwt");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.signedCookies.token;
    if (!token) {
        throw new errors_1.UnAuthenticatedError("Authentication Invalid");
    }
    try {
        const { name, userId, role, adminId } = (0, jwt_1.isTokenValid)({ token });
        req.user = { name, userId, role, adminId };
        /* ALTERNATIVE SYNTAX
        const payload: any = isTokenValid({ token });
        req.user = { name: payload.name, userId: payload.userId, role:payload.role};
        */
        next();
    }
    catch (error) {
        throw new errors_1.UnAuthenticatedError("Authentication Invalid");
    }
});
exports.authenticateUser = authenticateUser;
const authorizePermissions = (req, res, next) => {
    if (req.user.role !== "admin") {
        throw new errors_1.UnauthorizedError("Unauthorized to access this route");
    }
    next();
};
exports.authorizePermissions = authorizePermissions;

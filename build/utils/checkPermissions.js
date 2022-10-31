"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const checkPermissions = (reqUser, resourceUserId) => {
    //if(requestUser.role === 'admin') return
    if (reqUser.userId === resourceUserId.toString() ||
        reqUser.adminId === resourceUserId.toString())
        return;
    throw new errors_1.UnauthorizedError("Not authorized to access this route");
};
exports.default = checkPermissions;

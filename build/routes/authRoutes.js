"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controllers/authController");
const authentication_1 = require("../middleware/authentication");
router.route("/register").post(authController_1.register);
router.route("/login").post(authController_1.login);
router.get("/logout", authController_1.logout);
router.route("/updateUser").patch(authentication_1.authenticateUser, authController_1.updateUser);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bookingController_1 = require("../controllers/bookingController");
router.route("/").post(bookingController_1.createBooking).get(bookingController_1.getAllBookings);
router
    .route("/:id")
    .delete(bookingController_1.deleteBooking)
    .patch(bookingController_1.updateBooking);
exports.default = router;

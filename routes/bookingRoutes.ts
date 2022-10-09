import express from "express";
const router = express.Router();

import {
  createBooking,
  getAllBookings,
  getOneBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController";

router.route("/").post(createBooking).get(getAllBookings);
router
  .route("/:id")
  .get(getOneBooking)
  .delete(deleteBooking)
  .patch(updateBooking);

export default router;

import express from "express";
const router = express.Router();

import { createHotel, updateHotel } from "../controllers/hotelController";

router.route("/").post(createHotel);
router.route("/:id").patch(updateHotel);

export default router;

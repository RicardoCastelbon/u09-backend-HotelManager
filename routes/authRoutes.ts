import express from "express";
const router = express.Router();

import {
  register,
  login,
  logout,
  updateUser,
} from "../controllers/authController";

import { authenticateUser } from "../middleware/authentication";

router.route("/register").post(register);
router.route("/login").post(login);
router.get("/logout", logout);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;

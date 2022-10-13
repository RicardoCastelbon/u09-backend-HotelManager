import express from "express";
const router = express.Router();

import { register, login, logout } from "../controllers/authController";

router.route("/register").post(register);
router.route("/login").post(login);
router.get("/logout", logout);

export default router;

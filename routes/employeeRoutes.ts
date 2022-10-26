import express from "express";
const router = express.Router();

import {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";

import { authenticateUser } from "../middleware/authentication";

router
  .route("/")
  .post(authenticateUser, createEmployee)
  .get(authenticateUser, getAllEmployees);
router
  .route("/:id")
  .delete(authenticateUser, deleteEmployee)
  .patch(authenticateUser, updateEmployee);

export default router;

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
  .post(createEmployee)
  .get(getAllEmployees);
router
  .route("/:id")
  .delete( deleteEmployee)
  .patch(updateEmployee);

export default router;

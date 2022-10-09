import express from "express";
const router = express.Router();

import {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";

export default router;

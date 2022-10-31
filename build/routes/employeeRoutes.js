"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const employeeController_1 = require("../controllers/employeeController");
router
    .route("/")
    .post(employeeController_1.createEmployee)
    .get(employeeController_1.getAllEmployees);
router
    .route("/:id")
    .delete(employeeController_1.deleteEmployee)
    .patch(employeeController_1.updateEmployee);
exports.default = router;

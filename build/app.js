"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Express
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//Other Packages
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv")); // To load environment variables from .env
dotenv_1.default.config();
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//Database
const connect_1 = __importDefault(require("./db/connect"));
//Routers
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
//Middleware
app.use((0, cors_1.default)({
    origin: "https://shiny-kashata-8c2deb.netlify.app",
    credentials: true,
    exposedHeaders: ["Authorization"],
}));
app.use((0, morgan_1.default)("tiny")); //Log request for easy debugging
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const authentication_1 = require("./middleware/authentication");
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("HotelManager");
});
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/bookings", authentication_1.authenticateUser, bookingRoutes_1.default);
app.use("/api/v1/employees", authentication_1.authenticateUser, authentication_1.authorizePermissions, employeeRoutes_1.default);
app.use(not_found_1.default);
app.use(error_handler_1.default);
const port = process.env.PORT || 5000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)(`${process.env.MONGO_URI}`);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();

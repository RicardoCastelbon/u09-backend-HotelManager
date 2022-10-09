//Express
import express from "express";
const app = express();

//Other Packages
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; // To load environment variables from .env
dotenv.config();
import morgan from "morgan";
import cors from "cors";

//Database
import connectDB from "./db/connect";

//Routers
import authRouter from "./routes/authRoutes";
import hotelRoutes from "./routes/hotelRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import employeeRoutes from "./routes/employeeRoutes";

//Middleware
app.use(cors());
app.use(morgan("tiny")); //Log request fro easy debugging
app.use(cookieParser(process.env.JWT_SECRET));
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("HotelManager");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/hotel", hotelRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/employees", employeeRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(`${process.env.MONGO_URI}`);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

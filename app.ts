//Express
const express = require("express");
const app = express();

//Other Packages
const cookieParser = require("cookie-parser");
require("dotenv").config(); // To load environment variables from .env
import morgan from "morgan";
import cors from "cors";

//Database
const connectToDB = require("./db/connect");

//Routers
const authRouter = require("./routes/authRoutes");

//Middleware
app.use(cors());
app.use(morgan("tiny")); //Log request fro easy debugging
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req: any, res: any) => {
  res.send("HotelManager");
});

app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectToDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

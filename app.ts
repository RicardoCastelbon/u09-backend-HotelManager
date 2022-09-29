//Express
const express = require("express");
const app = express();

//Other Packages
require("dotenv").config(); // To load environment variables from .env

//Database
const connectToDB = require("./db/connect");

//Routers

//Middleware
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("HotelManager");
});

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

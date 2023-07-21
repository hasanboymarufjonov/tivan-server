const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./src/routes/userRoutes");
const collectionRoutes = require("./src/routes/collectionRoutes");
const itemRoutes = require("./src/routes/itemRoutes");
const { notFound, errorHandler } = require("./src/middlewares/errorMiddleware");

const { connectDB } = require("./src/config/db");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/collections", itemRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

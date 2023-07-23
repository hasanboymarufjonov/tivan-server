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
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:5173",
    origin: ["https://tivan-collector.vercel.app", "http://localhost:5173"],
  })
);

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://tivan-collector.vercel.app",
    "http://localhost:5173",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

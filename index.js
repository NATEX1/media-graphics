require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRoute");
const resultRouter = require("./routers/resultRoute");
const userRouter = require("./routers/userRoute")
const path = require('path')

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/result", resultRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

connectDB();

app.use(express.json());
app.use("/auth", userRoutes);
app.use("/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}...`);
});

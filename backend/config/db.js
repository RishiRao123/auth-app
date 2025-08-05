import mongoose from "mongoose";
import { DB_NAME } from "../constants/constants.js";

const connectDB = async () => {
  try {
    const mongo_URI = process.env.MONGODB_URI;
    if (!mongo_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    const connectionInstance = await mongoose.connect(
      `${mongo_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB connected sucessfully... HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB...", error);
    process.exit(1);
  }
};

export default connectDB;

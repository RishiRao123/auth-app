import express from "express";
import {
  loginValidation,
  signUpValidation,
} from "../middlewares/auth.middleware.js";
import { signUp, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUpValidation, signUp);
router.post("/login", loginValidation, login);

export default router;

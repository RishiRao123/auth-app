import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User exists aldready, you can login",
        sucess: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new User({ name, email, password: hashedPassword });
    await userModel.save();
    res.status(201).json({
      message: "User created sucessfully",
      sucess: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const errorMsg = "Authentication failed. Email or password is incorrect.";

    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export { signUp, login };

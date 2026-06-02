import { Request, Response } from "express";
import { authService } from "./auth.service.js";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !name || !password) {
      res
        .status(400)
        .json({ message: "Email, name and password are required" });
      return;
    }

    const result = await authService.createUser(name, email, password, role);
    res.status(201).json({ message: "User created successfully", ...result });
  } catch (error: any) {
    if (error.message === "User already exists") {
      res.status(409).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const logInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const result = await authService.loginUser(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({
      success: true,
      user: result.user,
    });
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      res.status(401).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const logOutUser = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const getMe = async (req: Request, res: Response) => {
  const user = await authService.getMe(req.user!.userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json({ user });
};

export const authController = {
  createUser,
  logInUser,
  logOutUser,
  getMe,
};

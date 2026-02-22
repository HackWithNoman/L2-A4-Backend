import { Request, Response } from "express";
import { authService } from "./auth.service";

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

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const result = await authService.loginUser(email, password);
    res.status(200).json({ message: "Login successful", ...result });
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      res.status(401).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const freshUser = await authService.getMe(user.userId);

    if (!freshUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "User retrieved successfully", user: freshUser });
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const authController = {
  createUser,
  loginUser,
  getMe,
};

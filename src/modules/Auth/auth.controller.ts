import { Request, Response } from "express";
import { authService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const result = await authService.createUser(email, password, role);
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

export const authController = {
  createUser,
  loginUser,
};

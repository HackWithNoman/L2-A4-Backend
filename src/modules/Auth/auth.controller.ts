import { Request, Response } from "express";
import { authService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const result = await authService.createUser(email, password);
    res.status(201).json(result);
  } catch (err: any) {
    console.error("createUser error:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await authService.loginUser(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to login user" });
  }
};

export const authController = {
  createUser,
  loginUser,
};

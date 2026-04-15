import express from "express";
import { authController } from "./auth.controller.js";
import { authenticate } from "../../Middleware/auth.js";

const router = express.Router();

router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.get("/me", authenticate, authController.getMe);

export const authRouter = router;

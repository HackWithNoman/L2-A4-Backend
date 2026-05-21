import express from "express";
import { authRouter } from "./modules/Auth/auth.router.js";
import { tutorRouter } from "./modules/Tutor/tutor.router.js";
import { adminRouter } from "./modules/Admin/admin.router.js";
import { publicRouter } from "./modules/Public/public.router.js";
import errorHandler from "./Middleware/errorHandler.js";
import { studentRouter } from "./modules/Student/student.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

// Auth
app.use("/api/v1/auth", authRouter);

// Admin
app.use("/api/v1/admin", adminRouter);

// Public
app.use("/api/v1", publicRouter);

// Tutors
app.use("/api/v1/tutor", tutorRouter);

// Student
app.use("/api/v1/student", studentRouter);

// Global Error Hanler
app.use(errorHandler);

export default app;

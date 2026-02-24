import express from "express";
import { authRouter } from "./modules/Auth/auth.router";
import { tutorRouter } from "./modules/Tutor/tutor.router";
import { adminRouter } from "./modules/Admin/admin.router";
import { publicRouter } from "./modules/Public/public.router";

const app = express();

app.use(express.json());

// Auth
app.use("/api/v1/auth", authRouter);

// Admin
app.use("/api/v1/admin", adminRouter);

// Public
app.use("/api/v1", publicRouter);

app.use("/api/v1/tutors", tutorRouter);

export default app;

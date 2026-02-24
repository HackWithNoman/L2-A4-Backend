import express from "express";
import { authRouter } from "./modules/Auth/auth.router";
import { tutorRouter } from "./modules/Tutor/tutor.router";
import { adminRouter } from "./modules/Admin/admin.router";

const app = express();

app.use(express.json());

// Auth
app.use("/api/v1/auth", authRouter);

// Admin
app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/tutors", tutorRouter);

export default app;

import express from "express";
import { authRouter } from "./modules/Auth/auth.router";
import { tutorRouter } from "./modules/Tutor/tutor.router";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/tutor", tutorRouter);

export default app;

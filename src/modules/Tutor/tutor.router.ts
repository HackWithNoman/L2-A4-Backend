import express from "express";
import { tutorController } from "./tutor.controller";

const router = express.Router();

router.post("/", tutorController.createTutor);
router.get("/", tutorController.getTutor);

export const tutorRouter = router;

import express from "express";
import { publicController } from "./public.controller.js";
const router = express.Router();
router.get("/categories", publicController.getCategories);
router.get("/tutors", publicController.getAllTutors);
router.get("/tutors/:id", publicController.getTutorById);
export const publicRouter = router;

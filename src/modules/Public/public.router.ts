import express from "express";
import { publicController } from "./public.controller";

const router = express.Router();

router.get("/categories", publicController.getCategories);

export const publicRouter = router;

import express from "express";
import { adminController } from "./admin.controller";
import { authenticate, authorize } from "../../Middleware/auth";

const router = express.Router();

router.post(
  "/categories",
  authenticate,
  authorize("ADMIN"),
  adminController.createCategory,
);

export const adminRouter = router;

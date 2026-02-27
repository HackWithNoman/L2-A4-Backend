import express from "express";
import { authenticate, authorize } from "../../Middleware/auth";
import { studentController } from "./student.controller";

const router = express.Router();

router.get(
  "/profile",
  authenticate,
  authorize("STUDENT"),
  studentController.getProfile,
);
router.put(
  "/profile",
  authenticate,
  authorize("STUDENT"),
  studentController.updateProfile,
);

export const studentRouter = router;

import express from "express";
import { tutorController } from "./tutor.controller";
import { authenticate, authorize } from "../../Middleware/auth";

const router = express.Router();

router.post(
  "/profile",
  authenticate,
  authorize("TUTOR"),
  tutorController.createProfile,
);
router.get(
  "/profile",
  authenticate,
  authorize("TUTOR"),
  tutorController.getProfile,
);
router.put(
  "/profile",
  authenticate,
  authorize("TUTOR"),
  tutorController.updateProfile,
);
router.post(
  "/availability",
  authenticate,
  authorize("TUTOR"),
  tutorController.createAvailability,
);
router.delete(
  "/availability/:id",
  authenticate,
  tutorController.deleteAvailability,
);

export const tutorRouter = router;

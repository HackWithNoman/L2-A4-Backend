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
router.get("/profile", authenticate, tutorController.getProfile);
router.put("/profile", authenticate, tutorController.updateProfile);
router.post("/availability", authenticate, tutorController.createAvailability);
router.delete(
  "/availability/:id",
  authenticate,
  tutorController.deleteAvailability,
);

export const tutorRouter = router;

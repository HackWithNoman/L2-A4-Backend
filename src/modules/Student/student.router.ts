import express from "express";
import { authenticate, authorize } from "../../Middleware/auth.js";
import { studentController } from "./student.controller.js";

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

router.post(
  "/bookings",
  authenticate,
  authorize("STUDENT"),
  studentController.createBooking,
);

router.get(
  "/bookings",
  authenticate,
  authorize("STUDENT"),
  studentController.getBookings,
);

router.get(
  "/bookings/:id",
  authenticate,
  authorize("STUDENT"),
  studentController.getBookings,
);

router.patch(
  "/bookings/:id/cancel",
  authenticate,
  authorize("STUDENT"),
  studentController.cancelBooking,
);

router.post(
  "/reviews",
  authenticate,
  authorize("STUDENT"),
  studentController.createReview,
);

export const studentRouter = router;

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

export const studentRouter = router;

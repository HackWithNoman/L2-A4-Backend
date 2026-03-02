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

router.put(
  "/categories/:id",
  authenticate,
  authorize("ADMIN"),
  adminController.updateCategory,
);

router.delete(
  "/categories/:id",
  authenticate,
  authorize("ADMIN"),
  adminController.deleteCategory,
);

router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  adminController.getAllUsers,
);

router.patch(
  "/users/:id",
  authenticate,
  authorize("ADMIN"),
  adminController.updateUserStatus,
);

router.get(
  "/bookings",
  authenticate,
  authorize("ADMIN"),
  adminController.getAllBookings,
);

export const adminRouter = router;

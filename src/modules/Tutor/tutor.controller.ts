import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";
import AppError from "../../errors/AppError";

const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId; // from auth middleware
    const data = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "user id required",
      });
    }

    const result = await tutorService.createProfile(userId, data);
    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const result = await tutorService.getProfile(userId);
    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const result = await tutorService.updateProfile(userId, req.body);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const profile = await tutorService.getProfile(userId);
    const result = await tutorService.createAvailability(profile.id, req.body);
    res.status(201).json({
      success: true,
      message: "Availability created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAvailability = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const { id } = req.params;
    const result = await tutorService.deleteAvailability(id, userId);
    res.status(200).json({
      success: true,
      message: "Availability deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getTutorBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const result = await tutorService.getTutorBookings(userId);
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

const updateBookingStatus = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const { id } = req.params;
    const result = await tutorService.updateBookingStatus(userId, id);
    res.status(200).json({
      success: true,
      message: "Booking marked as completed",
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

export const tutorController = {
  createProfile,
  getProfile,
  updateProfile,
  createAvailability,
  deleteAvailability,
  getTutorBookings,
  updateBookingStatus,
};

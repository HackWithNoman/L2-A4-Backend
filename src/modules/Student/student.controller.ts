import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";
import { studentService } from "./student.service";

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const result = await studentService.getProfile(userId);
    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      ...result,
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

    const result = await studentService.updateProfile(userId, req.body);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentController = {
  getProfile,
  updateProfile,
};

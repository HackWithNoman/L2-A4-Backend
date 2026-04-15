import { NextFunction, Request, Response } from "express";
import { publicService } from "./public.service.js";

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await publicService.getCategories();
    res
      .status(200)
      .json({ message: "Categories retrieved successfully", ...result });
  } catch (error) {
    next(error);
  }
};

const getAllTutors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await publicService.getAllTutors();
    res.status(200).json({
      success: true,
      message: "Tutors retrieved successfully",
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

const getTutorById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await publicService.getTutorById(id);
    res.status(200).json({
      success: true,
      message: "Tutor retrieved successfully",
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

export const publicController = {
  getCategories,
  getAllTutors,
  getTutorById,
};

import { NextFunction, Request, Response } from "express";
import { publicService } from "./public.service";

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

export const publicController = {
  getCategories,
};

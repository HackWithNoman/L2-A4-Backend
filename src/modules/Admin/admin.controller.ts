import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";

const createCategory = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    if (!payload.name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category = await adminService.createCategory(payload);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};

const updateCategory = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await adminService.updateCategory(id, data);
    res
      .status(200)
      .json({ message: "Category updated successfully", ...result });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await adminService.deleteCategory(id);

    res
      .status(200)
      .json({ message: "Category deleted successfully", ...result });
  } catch (err) {
    next(err);
  }
};

export const adminController = {
  createCategory,
  updateCategory,
  deleteCategory,
};

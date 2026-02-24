import { Request, Response } from "express";
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

export const adminController = {
  createCategory,
};

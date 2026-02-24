import { Request, Response } from "express";
import { publicService } from "./public.service";

const getCategories = async (req: Request, res: Response) => {
  const cateGories = await publicService.getCategories();

  res
    .status(201)
    .json({ message: "Category retrived successfully", ...cateGories });
};

export const publicController = {
  getCategories,
};

import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const getCategories = async () => {
  const categories = await prisma.category.findMany();

  // return { categories };
  //
  if (!categories.length) {
    throw new AppError("No categories found", 404); // 👈 controller catches this, passes to global handler
  }

  return { categories };
};

export const publicService = {
  getCategories,
};

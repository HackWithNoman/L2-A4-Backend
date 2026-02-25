import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: JwtPayload) => {
  const category = await prisma.category.create({
    data: {
      name: payload.name,
      description: payload.description,
    },
  });

  return category;
};

const updateCategory = async (id: string, data: any) => {
  const category = await prisma.category.update({
    where: { id },
    data,
  });

  return { category };
};

const deleteCategory = async (id: string) => {
  const category = await prisma.category.delete({
    where: { id },
  });

  return { category };
};

export const adminService = {
  createCategory,
  updateCategory,
  deleteCategory,
};

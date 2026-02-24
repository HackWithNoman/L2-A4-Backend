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

export const adminService = {
  createCategory,
};

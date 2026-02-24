import { prisma } from "../../lib/prisma";

const getCategories = async () => {
  const categories = await prisma.category.findMany();

  return { categories };
};

export const publicService = {
  getCategories,
};

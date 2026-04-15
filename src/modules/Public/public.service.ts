import AppError from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";

const getCategories = async () => {
  const categories = await prisma.category.findMany();

  if (!categories.length) {
    throw new AppError("No categories found", 404); // 👈 controller catches this, passes to global handler
  }

  return { categories };
};

const getAllTutors = async () => {
  const tutors = await prisma.tutorProfile.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      category: true,
      availability: true,
    },
  });
  return { tutors };
};

const getTutorById = async (id: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      category: true,
      availability: true,
      reviews: true,
    },
  });

  console.log(tutor, id);

  if (!tutor) {
    throw new AppError("Tutor not found", 404);
  }

  return { tutor };
};

export const publicService = {
  getCategories,
  getAllTutors,
  getTutorById,
};

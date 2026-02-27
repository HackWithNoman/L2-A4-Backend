import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const getProfile = async (userId: string) => {
  const profile = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      created_at: true,
      bookingsAs: true,
    },
  });

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  return { profile };
};

const updateProfile = async (userId: string, data: any) => {
  const { name, email } = data;
  const profile = await prisma.user.update({
    where: { id: userId },
    data: { name, email },
  });

  return { profile };
};

export const studentService = {
  getProfile,
  updateProfile,
};

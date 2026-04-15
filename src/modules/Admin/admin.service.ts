import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
import AppError from "../../errors/AppError.js";
import { UserStatus } from "../../prisma/generated/prisma/enums.js";


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

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      created_at: true,
    },
  });
  return { users };
};

const updateUserStatus = async (userId: string, status: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { status: status as UserStatus },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return { user: updated };
};

const getAllBookings = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      student: {
        select: {
          name: true,
          email: true,
        },
      },
      tutor: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
      slot: true,
      review: true,
    },
  });
  return { bookings };
};

export const adminService = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllUsers,
  updateUserStatus,
  getAllBookings,
};

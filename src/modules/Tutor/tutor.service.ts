import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const createProfile = async (userId: string, data: any) => {
  const profile = await prisma.tutorProfile.create({
    data: {
      user_id: userId,
      category_id: data.category_id,
      bio: data.bio,
      hourly_rate: data.hourly_rate,
    },
  });
  return profile;
};

const getProfile = async (userId: string) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { user_id: userId },
  });

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  return profile;
};

const updateProfile = async (userId: string, data: any) => {
  const profile = await prisma.tutorProfile.update({
    where: { user_id: userId },
    data,
  });
  return profile;
};

const createAvailability = async (tutorId: string, data: any) => {
  const availability = await prisma.availability.create({
    data: {
      tutor_id: tutorId,
      start_time: new Date(data.start_time),
      end_time: new Date(data.end_time),
    },
  });
  return availability;
};

const deleteAvailability = async (id: string, userId: string) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { user_id: userId },
  });

  const availability = await prisma.availability.findUnique({
    where: { id },
  });

  if (availability?.tutor_id !== profile?.id) {
    throw new AppError("You can only delete your own availability", 403);
  }

  return await prisma.availability.delete({ where: { id } });
};

export const tutorService = {
  createProfile,
  getProfile,
  updateProfile,
  createAvailability,
  deleteAvailability,
};

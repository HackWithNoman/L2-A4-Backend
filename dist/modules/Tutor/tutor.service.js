import AppError from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
const createProfile = async (userId, data) => {
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
const getProfile = async (userId) => {
    const profile = await prisma.tutorProfile.findUnique({
        where: { user_id: userId },
    });
    if (!profile) {
        throw new AppError("Profile not found", 404);
    }
    return profile;
};
const updateProfile = async (userId, data) => {
    const profile = await prisma.tutorProfile.update({
        where: { user_id: userId },
        data,
    });
    return profile;
};
const createAvailability = async (tutorId, data) => {
    const availability = await prisma.availability.create({
        data: {
            tutor_id: tutorId,
            start_time: new Date(data.start_time),
            end_time: new Date(data.end_time),
        },
    });
    return availability;
};
const deleteAvailability = async (id, userId) => {
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
const getTutorBookings = async (userId) => {
    const profile = await prisma.tutorProfile.findUnique({
        where: { user_id: userId },
    });
    if (!profile) {
        throw new AppError("Tutor profile not found", 404);
    }
    const bookings = await prisma.booking.findMany({
        where: { tutor_id: profile.id },
        include: {
            student: {
                select: {
                    name: true,
                    email: true,
                },
            },
            slot: true,
            review: true,
        },
    });
    return { bookings };
};
const updateBookingStatus = async (userId, bookingId) => {
    const profile = await prisma.tutorProfile.findUnique({
        where: { user_id: userId },
    });
    if (!profile) {
        throw new AppError("Tutor profile not found", 404);
    }
    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
    });
    if (!booking) {
        throw new AppError("Booking not found", 404);
    }
    if (booking.tutor_id !== profile.id) {
        throw new AppError("You can only update your own bookings", 403);
    }
    if (booking.status === "COMPLETED") {
        throw new AppError("Booking is already completed", 400);
    }
    if (booking.status === "CANCELLED") {
        throw new AppError("Cannot complete a cancelled booking", 400);
    }
    const updated = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "COMPLETED" },
    });
    return { booking: updated };
};
export const tutorService = {
    createProfile,
    getProfile,
    updateProfile,
    createAvailability,
    deleteAvailability,
    getTutorBookings,
    updateBookingStatus,
};

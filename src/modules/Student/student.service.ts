import AppError from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";

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

const createBooking = async (studentId: string, data: any) => {
  const slot = await prisma.availability.findUnique({
    where: { id: data.slot_id },
  });

  if (!slot) {
    throw new AppError("Slot not found", 404);
  }

  if (slot.is_booked) {
    throw new AppError("Slot is already booked", 400);
  }

  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: slot.tutor_id },
  });

  if (!tutor) {
    throw new AppError("Tutor not found", 404);
  }

  const durationHours =
    (slot.end_time.getTime() - slot.start_time.getTime()) / (1000 * 60 * 60);
  const totalPrice = Number(tutor.hourly_rate) * durationHours;

  const booking = await prisma.booking.create({
    data: {
      student_id: studentId,
      tutor_id: slot.tutor_id,
      slot_id: data.slot_id,
      total_price: totalPrice,
    },
  });

  await prisma.availability.update({
    where: { id: data.slot_id },
    data: { is_booked: true },
  });

  return { booking };
};

const getBookings = async (studentId: string) => {
  const bookings = await prisma.booking.findMany({
    where: { student_id: studentId },
    include: {
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

const getBookingById = async (studentId: string, bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
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

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  if (booking.student_id !== studentId) {
    throw new AppError("You can only view your own bookings", 403);
  }

  return { booking };
};

const cancelBooking = async (studentId: string, bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  if (booking.student_id !== studentId) {
    throw new AppError("You can only cancel your own bookings", 403);
  }

  if (booking.status === "CANCELLED") {
    throw new AppError("Booking is already cancelled", 400);
  }

  if (booking.status === "COMPLETED") {
    throw new AppError("Cannot cancel a completed booking", 400);
  }

  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });

  // free up the slot again
  await prisma.availability.update({
    where: { id: booking.slot_id },
    data: { is_booked: false },
  });

  return { booking: updated };
};

const createReview = async (studentId: string, data: any) => {
  const booking = await prisma.booking.findUnique({
    where: { id: data.booking_id },
  });

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  if (booking.student_id !== studentId) {
    throw new AppError("You can only review your own bookings", 403);
  }

  if (booking.status !== "COMPLETED") {
    throw new AppError("You can only review completed bookings", 400);
  }

  const existingReview = await prisma.review.findUnique({
    where: { booking_id: data.booking_id },
  });

  if (existingReview) {
    throw new AppError("You have already reviewed this booking", 400);
  }

  const review = await prisma.review.create({
    data: {
      booking_id: data.booking_id,
      student_id: studentId,
      tutor_id: booking.tutor_id,
      rating: data.rating,
      comment: data.comment,
    },
  });

  return { review };
};

export const studentService = {
  getProfile,
  updateProfile,
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
  createReview,
};

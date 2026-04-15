import AppError from "../../errors/AppError.js";
import { studentService } from "./student.service.js";
const getProfile = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw new AppError("Unauthorized", 401);
        }
        const result = await studentService.getProfile(userId);
        res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            ...result,
        });
    }
    catch (err) {
        next(err);
    }
};
const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw new AppError("Unauthorized", 401);
        }
        const result = await studentService.updateProfile(userId, req.body);
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            ...result,
        });
    }
    catch (err) {
        next(err);
    }
};
const createBooking = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw new AppError("Unauthorized", 401);
        }
        const result = await studentService.createBooking(userId, req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            ...result,
        });
    }
    catch (err) {
        next(err);
    }
};
const getBookings = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw new AppError("Unauthorized", 401);
        }
        const result = await studentService.getBookings(userId);
        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            ...result,
        });
    }
    catch (err) {
        next(err);
    }
};
const getBookingById = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw new AppError("Unauthorized", 401);
        }
        const { id } = req.params;
        const result = await studentService.getBookingById(userId, id);
        res.status(200).json({
            success: true,
            message: "Booking retrieved successfully",
            ...result,
        });
    }
    catch (err) {
        next(err);
    }
};
const cancelBooking = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw new AppError("Unauthorized", 401);
        }
        const { id } = req.params;
        const result = await studentService.cancelBooking(userId, id);
        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            ...result,
        });
    }
    catch (err) {
        next(err);
    }
};
const createReview = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw new AppError("Unauthorized", 401);
        }
        const result = await studentService.createReview(userId, req.body);
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            ...result,
        });
    }
    catch (err) {
        next(err);
    }
};
export const studentController = {
    getProfile,
    updateProfile,
    createBooking,
    getBookings,
    getBookingById,
    cancelBooking,
    createReview,
};

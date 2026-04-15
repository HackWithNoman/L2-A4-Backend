import { adminService } from "./admin.service.js";
import AppError from "../../errors/AppError.js";
const createCategory = async (req, res) => {
    const payload = req.body;
    try {
        if (!payload.name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }
        const category = await adminService.createCategory(payload);
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create category",
        });
    }
};
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await adminService.updateCategory(id, data);
        res
            .status(200)
            .json({ message: "Category updated successfully", ...result });
    }
    catch (err) {
        next(err);
    }
};
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await adminService.deleteCategory(id);
        res
            .status(200)
            .json({ message: "Category deleted successfully", ...result });
    }
    catch (err) {
        next(err);
    }
};
const getAllUsers = async (req, res, next) => {
    try {
        const result = await adminService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            ...result,
        });
    }
    catch (err) {
        next(err);
    }
};
const updateUserStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            throw new AppError("Status is required", 400);
        }
        if (!["ACTIVE", "BANNED"].includes(status)) {
            throw new AppError("Status must be ACTIVE or BANNED", 400);
        }
        const result = await adminService.updateUserStatus(id, status);
        res.status(200).json({
            success: true,
            message: "User status updated successfully",
            ...result,
        });
    }
    catch (err) {
        next(err);
    }
};
const getAllBookings = async (req, res, next) => {
    try {
        const result = await adminService.getAllBookings();
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
export const adminController = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllUsers,
    updateUserStatus,
    getAllBookings,
};

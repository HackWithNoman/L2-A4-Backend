import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;
const createUser = async (name, email, password, role) => {
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            role: role,
        },
    });
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    return { user: { id: user.id, email: user.email }, token };
};
const loginUser = async (email, password) => {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    return { user: { id: user.id, email: user.email }, token };
};
const getMe = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            role: true,
        },
    });
    return user;
};
export const authService = {
    createUser,
    loginUser,
    getMe,
};

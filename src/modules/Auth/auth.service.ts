import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, {
      expiresIn: "1h",
    });

    return { ...user, token };
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) return null;

  const validtoken = jwt.sign({ userId: user.id }, JWT_SECRET!, {
    expiresIn: "1h",
  });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return { ...user, token: validtoken };
};

export const authService = {
  createUser,
  loginUser,
};

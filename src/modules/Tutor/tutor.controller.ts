import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

const createTutor = async (req: Request, res: Response) => {
  //   const { name, email, password } = req.body;
  //   const tutor = await prisma.user.create({
  //     data: {
  //       name,
  //       email,
  //       password,
  //       role: "TUTOR",
  //     },
  //   });
  //   res.json(tutor);

  res.send("Create tutor");
};

const getTutor = async (req: Request, res: Response) => {
  const tutors = await prisma.user.findMany({
    where: {
      role: "TUTOR",
    },
  });
  res.json(tutors);
};

export const tutorController = {
  getTutor,
  createTutor,
};

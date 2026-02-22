declare namespace Express {
  interface Request {
    user?: {
      userId: string;
      email: string;
      role: "student" | "tutor" | "admin";
    };
  }
}

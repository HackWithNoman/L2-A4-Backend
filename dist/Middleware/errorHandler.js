import AppError from "../errors/AppError.js";
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    // Unexpected errors
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
};
export default errorHandler;

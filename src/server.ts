import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to skillbridge API" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

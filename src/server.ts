import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Skillbridge Backend");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

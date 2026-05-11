const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({
  limit: "50mb",
  extended: true,
}));

// ROUTES
const authRoutes = require("./routes/authRoutes");
const photoRoutes = require("./routes/photoRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/photos", photoRoutes);


app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
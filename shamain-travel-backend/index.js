// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/account");
const packageRoutes = require("./routes/package");
const programRoutes = require("./routes/program");
const galleryRoutes = require("./routes/gallery");
const dashboardRoutes = require("./routes/dashboard");
const galleryPublicRoutes = require("./routes/gallery-public");
const packagePublicRoutes = require("./routes/package-public");
const emailPublicRoutes = require("./routes/email");


const authenticateToken = require("./middleware/authenticateToken");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/public-gallery", galleryPublicRoutes);
app.use("/api/public-packages", packagePublicRoutes);
app.use("/api/email", emailPublicRoutes);
app.use("/api/accounts", authenticateToken, accountRoutes);
app.use("/api/programs", authenticateToken, programRoutes);
app.use("/api/packages", authenticateToken, packageRoutes);
app.use("/api/gallery", authenticateToken, galleryRoutes);
app.use("/api/dashboard", authenticateToken, dashboardRoutes);

// Default test route
app.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    status: "OK",
    message: "API Shamain Travel is Running...",
    data: null,
  });
});

module.exports = app;

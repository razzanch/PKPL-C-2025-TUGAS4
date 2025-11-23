// server.js
const path = require("path");
const express = require("express");
const app = require("./index"); // Import express app dari index.js

// Serve static files from the public folder (including favicon.ico)
app.use(express.static(path.join(__dirname, "public")));


// Serve static files (gambar di folder public/uploads)
app.use("/uploads", require("express").static(path.join(__dirname, "public/uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log("Static files dari:", path.join(__dirname, "public/uploads"));
});

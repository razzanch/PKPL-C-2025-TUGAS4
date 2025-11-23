const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Import koneksi database
const bcrypt = require("bcryptjs");
const authenticateToken = require("../middleware/authenticateToken"); // Import middleware
require("dotenv").config();

// Endpoint login
router.post("/login", async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      code: 400,
      status: "Bad Request",
      message: "Username dan password harus diisi!",
      data: null,
    });
  }

  try {
    const query = "SELECT * FROM Accounts WHERE username = ?";
    const [rows] = await db.execute(query, [username]);


    if (rows.length === 0) {
      return res.status(401).json({
        code: 401,
        status: "Unauthorized",
        message: "Username atau password salah",
        data: null,
      });
    }

    const user = rows[0];


    let passwordMatch = false;

    if (user.password.startsWith("$2b$") || user.password.startsWith("$2a$")) {
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {

      passwordMatch = password === user.password;
    }


    if (!passwordMatch) {
      return res.status(401).json({
        code: 401,
        status: "Unauthorized",
        message: "Username atau password salah",
        data: null,
      });
    }

    // Generate token JWT
    const token = jwt.sign(
      { id: user.id_accounts, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Login berhasil!",
      data: {
        token,
        role: user.role,
        username: user.username, // Tambahkan username di response
      },
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal server error",
      data: null,
    });
  }
});


// Endpoint untuk mengambil data user berdasarkan token
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const query = "SELECT username FROM Accounts WHERE id_accounts = ?";
    const [rows] = await db.execute(query, [req.user.id]); // req.user berasal dari middleware

    if (rows.length === 0) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "User tidak ditemukan!",
        data: null,
      });
    }

    const user = rows[0];

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Data user berhasil diambil!",
      data: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Gagal mengambil data user",
      data: null,
    });
  }
});


module.exports = router;

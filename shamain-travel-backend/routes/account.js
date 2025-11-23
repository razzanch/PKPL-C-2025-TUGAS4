const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../config/db"); // Import koneksi database
const authenticateToken = require("../middleware/authenticateToken"); // Import middleware

const router = express.Router();


router.post("/post", authenticateToken, async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Username, password, dan role wajib diisi!",
        data: null,
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Password harus minimal 8 karakter!",
        data: null,
      });
    }

    const allowedRoles = ["admin", "user"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Role tidak valid! Gunakan 'admin' atau 'user'.",
        data: null,
      });
    }

    const [existingUser] = await pool.query(
      "SELECT id_accounts FROM accounts WHERE username = ?",
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        code: 409,
        status: "Conflict",
        message: "Username sudah digunakan!",
        data: null,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = "INSERT INTO accounts (username, password, role) VALUES (?, ?, ?)";
    await pool.query(sql, [username, hashedPassword, role]);

    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Akun admin berhasil dibuat!",
      data: {
        username,
        role,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Terjadi kesalahan server",
      data: null,
    });
  }
});


router.get("/get", authenticateToken, async (req, res) => {
  try {
    const [accounts] = await pool.query("SELECT id_accounts, username, role FROM accounts");
    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Data accounts berhasil diambil",
      data: accounts,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Terjadi kesalahan server",
      data: null,
    });
  }
});


router.put("/put/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, newPassword } = req.body;

    if (!username) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Username wajib diisi!",
        data: null,
      });
    }

    // **Cek apakah username sudah digunakan oleh akun lain**
    const [existingUsername] = await pool.query(
      "SELECT * FROM accounts WHERE username = ? AND id_accounts != ?",
      [username, id]
    );

    if (existingUsername.length > 0) {
      return res.status(409).json({
        code: 409,
        status: "Conflict",
        message: "Username sudah digunakan oleh akun lain!",
        data: null,
      });
    }

    // **Cek apakah akun dengan ID tersebut ada**
    const [existingAccount] = await pool.query(
      "SELECT * FROM accounts WHERE id_accounts = ?",
      [id]
    );

    if (existingAccount.length === 0) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Akun tidak ditemukan!",
        data: null,
      });
    }

    let updateQuery = "UPDATE accounts SET username = ? WHERE id_accounts = ?";
    let updateValues = [username, id];

    // **Jika newPassword dikirim, hash password baru dan update password**
    if (newPassword) {
      if (newPassword.length < 8) {
        return res.status(400).json({
          code: 400,
          status: "Bad Request",
          message: "Password harus minimal 8 karakter!",
          data: null,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      updateQuery = "UPDATE accounts SET username = ?, password = ? WHERE id_accounts = ?";
      updateValues = [username, hashedPassword, id];
    }

    // **Jalankan query update**
    await pool.query(updateQuery, updateValues);

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Akun berhasil diperbarui!",
      data: { id, username },
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Terjadi kesalahan server",
      data: null,
    });
  }
});


router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Konfirmasi username wajib diisi!",
        data: null,
      });
    }

    // Cek apakah akun dengan ID tersebut ada
    const [existingAccount] = await pool.query(
      "SELECT * FROM accounts WHERE id_accounts = ?",
      [id]
    );

    if (existingAccount.length === 0) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Akun tidak ditemukan!",
        data: null,
      });
    }

    // Pastikan username yang dimasukkan sesuai
    if (existingAccount[0].username !== username) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Username tidak sesuai!",
        data: null,
      });
    }

    // Hapus akun
    await pool.query("DELETE FROM accounts WHERE id_accounts = ?", [id]);

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Akun berhasil dihapus!",
      data: { id, username },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Terjadi kesalahan server",
      data: null,
    });
  }
});

module.exports = router;

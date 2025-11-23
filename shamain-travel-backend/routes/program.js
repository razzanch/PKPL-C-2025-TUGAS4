const express = require("express");
const router = express.Router();
const db = require("../config/db.js"); // Pastikan ini sesuai dengan koneksi MySQL kamu
const authenticateToken = require("../middleware/authenticateToken");

//** [POST] Tambah Program Baru */
router.post("/post", authenticateToken, async (req, res) => {
    const { name_program, period, category_program, accounts_id_accounts } = req.body;

    // Validasi field wajib
    if (!name_program || !period || !category_program || !accounts_id_accounts) {
        return res.status(400).json({
            code: 400,
            status: "error",
            message: "Semua field wajib diisi!",
            data: {},
        });
    }

    try {
        // Cek apakah name_program sudah ada
        const [existingProgram] = await db.execute(
            "SELECT id_program FROM program WHERE name_program = ?",
            [name_program]
        );

        if (existingProgram.length > 0) {
            return res.status(409).json({  // 409: Conflict
                code: 409,
                status: "error",
                message: "Program dengan nama tersebut sudah ada!",
                data: {},
            });
        }

        // Cari id_accounts berdasarkan username
        const [account] = await db.execute(
            "SELECT id_accounts FROM accounts WHERE username = ?",
            [accounts_id_accounts]
        );

        // Jika username tidak ditemukan
        if (account.length === 0) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "Username tidak ditemukan!",
                data: {},
            });
        }

        const id_accounts = account[0].id_accounts; // Ambil id_accounts

        // Simpan data program ke tabel programs
        const query = "INSERT INTO program (name_program, period, category_program, accounts_id_accounts) VALUES (?, ?, ?, ?)";
        const values = [name_program, period, category_program, id_accounts];

        const [result] = await db.execute(query, values);

        res.status(201).json({
            code: 201,
            status: "success",
            message: "Program berhasil ditambahkan!",
            data: { id: result.insertId, name_program, period, category_program, accounts_id_accounts: id_accounts },
        });

    } catch (error) {
        console.error("Error di backend:", error); // Debug: Tampilkan pesan error
        res.status(500).json({
            code: 500,
            status: "error",
            message: "Terjadi kesalahan saat menambahkan program!",
            data: {},
        });
    }
});


// **[GET] Ambil Semua Program dengan Username**
router.get("/get", authenticateToken, async (req, res) => {
    try {
        // Query untuk mengambil semua data program dan mengganti accounts_id_accounts dengan username
        const query = `
            SELECT 
                p.id_program, 
                p.name_program, 
                p.period, 
                p.category_program, 
                a.username AS accounts_username
            FROM program p
            JOIN accounts a ON p.accounts_id_accounts = a.id_accounts
            ORDER BY p.id_program ASC
        `;
        
        const [programs] = await db.execute(query);

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Data program berhasil diambil!",
            data: programs,
        });
    } catch (error) {
        console.error("Error saat mengambil data program:", error);
        res.status(500).json({
            code: 500,
            status: "error",
            message: "Terjadi kesalahan saat mengambil data program!",
            data: {},
        });
    }
});


router.put("/put/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name_program, period } = req.body;

  // Validasi input
  if (!name_program || !period) {
    return res.status(400).json({
      code: 400,
      status: "error",
      message: "Field name_program dan period wajib diisi!",
      data: {},
    });
  }

  try {
    // **Cek apakah program sudah ada dengan nama yang sama (duplikasi)**
    const checkQuery = "SELECT * FROM program WHERE name_program = ? AND id_program != ?";
    const [existingPrograms] = await db.execute(checkQuery, [name_program, id]);

    if (existingPrograms.length > 0) {

      return res.status(409).json({ // 409 = Conflict (Data sudah ada)
        code: 409,
        status: "error",
        message: "Program dengan nama ini sudah ada!",
        data: existingPrograms,
      });
    }

    // **Jika tidak ada duplikasi, lanjut update**
    const query = "UPDATE program SET name_program = ? WHERE id_program = ?";
    const values = [name_program, id];


    const [result] = await db.execute(query, values);

    if (result.affectedRows === 0) {
      console.error("Program tidak ditemukan - ID:", id);
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Program tidak ditemukan!",
        data: {},
      });
    }

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Program berhasil diperbarui!",
      data: { id, name_program, period },
    });
  } catch (error) {
    console.error("Kesalahan saat update:", error.message);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan saat memperbarui program!",
      error: error.message, // Tambahkan untuk debugging
      data: {},
    });
  }
});



router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name_program } = req.body;

    // Validate required fields
    if (!name_program) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Konfirmasi nama program wajib diisi!",
        data: null,
      });
    }

    // Check if program exists
    const [existingProgram] = await db.query(
      "SELECT id_program, name_program FROM program WHERE id_program = ?",
      [id]
    );

    if (existingProgram.length === 0) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Program tidak ditemukan!",
        data: null,
      });
    }

    // Verify program name matches
    if (existingProgram[0].name_program !== name_program) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Nama program tidak sesuai dengan ID program!",
        data: null,
      });
    }

    // Delete the program
    await db.query("DELETE FROM program WHERE id_program = ?", [id]);

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Program berhasil dihapus!",
      data: { 
        id_program: id,
        name_program: existingProgram[0].name_program 
      },
    });
  } catch (error) {
    console.error("Error:", error);
    
    // Handle foreign key constraint violation (if packages exist for this program)
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        code: 409,
        status: "Conflict",
        message: "Tidak dapat menghapus program karena terdapat paket yang terkait!",
        data: null,
      });
    }
    
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Terjadi kesalahan server",
      data: null,
    });
  }
});


module.exports = router;
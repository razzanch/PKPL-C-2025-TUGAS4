const express = require("express");
const router = express.Router();
const db = require("../config/db.js"); // Pastikan koneksi MySQL benar
const authenticateToken = require("../middleware/authenticateToken");

router.post("/post", authenticateToken, async (req, res) => {
    // Parse dan validasi input
    const { name_package, star, hotel, airline_path, quad, triple, double, include_text, note, program } = req.body;


    // Validasi field wajib
    if (!name_package || star === undefined || !hotel || !airline_path || !program) {
        return res.status(400).json({
            code: 400,
            status: "error",
            message: "Field wajib tidak boleh kosong!",
            data: {},
        });
    }

    // Validasi tipe data
    if (isNaN(star) || 
        (quad !== null && isNaN(quad)) || 
        (triple !== null && isNaN(triple)) || 
        (double !== null && isNaN(double))) {
        return res.status(400).json({
            code: 400,
            status: "error",
            message: "Format angka tidak valid!",
            data: {},
        });
    }

    try {
        // Cari ID program
        const [programResult] = await db.execute(
            "SELECT id_program FROM program WHERE name_program = ? LIMIT 1",
            [program]
        );

        if (programResult.length === 0) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "Program tidak ditemukan!",
                data: {},
            });
        }

        const program_id_program = programResult[0].id_program;

        // Cek duplikat nama paket
        const [existingPackage] = await db.execute(
            "SELECT id_package FROM package WHERE name_package = ? AND program_id_program = ? LIMIT 1",
            [name_package, program_id_program]
        );

        if (existingPackage.length > 0) {
            return res.status(409).json({
                code: 409,
                status: "error",
                message: "Nama paket sudah ada dalam program ini!",
                data: {},
            });
        }

        // Cek jumlah paket dalam program
        const [packageCount] = await db.execute(
            "SELECT COUNT(*) AS total FROM package WHERE program_id_program = ?",
            [program_id_program]
        );

        if (packageCount[0].total >= 4) {
            return res.status(403).json({
                code: 403,
                status: "error",
                message: "Program ini sudah memiliki maksimal 4 paket!",
                data: {},
            });
        }

        // Konversi nilai ke decimal
        const formatDecimal = (value) => value !== null ? parseFloat(value).toFixed(2) : null;

        // Insert data
        const query = `INSERT INTO package 
                      (name_package, star, hotel, airline_path, quad, triple, \`double\`, include_text, note, program_id_program) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const values = [
            name_package,
            parseInt(star),
            hotel,
            airline_path,
            formatDecimal(quad),
            formatDecimal(triple),
            formatDecimal(double),
            include_text,
            note,
            program_id_program
        ];

        const [result] = await db.execute(query, values);

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Paket berhasil ditambahkan!",
            data: { id: result.insertId },
        });
    } catch (error) {
        console.error("Error di backend:", error);
        
        // Handle khusus error database
        if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
            return res.status(400).json({
                code: 400,
                status: "error",
                message: "Format data tidak valid untuk disimpan di database",
                data: {},
            });
        }

        res.status(500).json({
            code: 500,
            status: "error",
            message: "Terjadi kesalahan saat menambahkan paket!",
            data: {},
        });
    }
});


// **[GET] Ambil Semua Paket dengan Name Program**
router.get("/get", authenticateToken, async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id_package, 
                p.name_package, 
                p.star, 
                p.hotel, 
                p.airline_path, 
                p.quad, 
                p.triple, 
                p.double, 
                p.include_text, 
                p.note, 
                pr.name_program,
                pr.category_program 
            FROM package p
            JOIN program pr ON p.program_id_program = pr.id_program
            ORDER BY p.id_package ASC
        `;

        const [packages] = await db.execute(query);
        
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Data paket berhasil diambil!",
            data: packages,
        });
    } catch (error) {
        console.error("Error saat mengambil data paket:", error);
        res.status(500).json({
            code: 500,
            status: "error",
            message: "Terjadi kesalahan saat mengambil data paket!",
            data: {},
        });
    }
});


// **[DELETE] Hapus Paket by ID**
router.delete("/delete/:id", authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { name_package } = req.body;
  
      // Validasi input
      if (!name_package) {
        return res.status(400).json({
          code: 400,
          status: "Bad Request",
          message: "Konfirmasi nama paket wajib diisi!",
          data: null,
        });
      }
  
      // Cek apakah paket dengan ID tersebut ada
      const [existingPackage] = await db.query(
        "SELECT id_package, name_package FROM package WHERE id_package = ?",
        [id]
      );
  
      if (existingPackage.length === 0) {
        return res.status(404).json({
          code: 404,
          status: "Not Found",
          message: "Paket tidak ditemukan!",
          data: null,
        });
      }
  
      // Validasi nama paket sesuai
      if (existingPackage[0].name_package !== name_package) {
        return res.status(400).json({
          code: 400,
          status: "Bad Request",
          message: "Nama paket tidak sesuai dengan ID paket!",
          data: null,
        });
      }
  
      // Hapus paket dari database
      await db.query("DELETE FROM package WHERE id_package = ?", [id]);
  
      res.status(200).json({
        code: 200,
        status: "OK",
        message: "Paket berhasil dihapus!",
        data: { 
          id_package: id,
          name_package: existingPackage[0].name_package 
        },
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        code: 500,
        status: "Internal Server Error",
        message: "Terjadi kesalahan server saat menghapus paket",
        data: null,
      });
    }
  });

module.exports = router;

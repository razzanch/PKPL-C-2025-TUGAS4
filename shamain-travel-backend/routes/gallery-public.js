const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Sesuaikan path jika berbeda

// Endpoint GET untuk menampilkan galeri publik
router.get("/get", async (req, res) => {
  try {
    const sql = `
    SELECT p.name_program, p.period, p.category_program, g.image_file 
    FROM gallery g
    JOIN program p ON g.program_id_program = p.id_program
    ORDER BY g.id_gallery DESC
  `;
  

    const [rows] = await db.query(sql);

    // Grouping berdasarkan program
    const grouped = {};

    rows.forEach(row => {
      const key = `${row.name_program}_${row.period}_${row.category_program}`;
      if (!grouped[key]) {
        grouped[key] = {
          name_program: row.name_program,
          period: row.period,
          category_program: row.category_program,
          image_files: [],
        };
      }
      grouped[key].image_files.push(row.image_file);
    });

    const result = Object.values(grouped);

    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

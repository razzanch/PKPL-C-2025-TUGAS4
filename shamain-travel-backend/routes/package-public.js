const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan sesuai path konfigurasi koneksi

// GET all public packages grouped by program
router.get('/get', async (req, res) => {
  try {
    const [results] = await db.query(`
SELECT 
  pk.id_package, -- Tambahkan ini
  p.id_program,
  p.name_program,
  p.period,
  p.category_program,
  pk.name_package,
  pk.star,
  pk.hotel,
  pk.airline_path,
  pk.quad,
  pk.triple,
  pk.double,
  pk.include_text,
  pk.note,
  pk.program_id_program
FROM program p
LEFT JOIN package pk ON p.id_program = pk.program_id_program
ORDER BY p.id_program ASC
    `);

    const groupedPrograms = {};

    results.forEach(row => {
      const programId = row.id_program;

      if (!groupedPrograms[programId]) {
        groupedPrograms[programId] = {
          id_program: row.id_program,
          name_program: row.name_program,
          period: row.period,
          category_program: row.category_program,
          packages: []
        };
      }

      if (row.name_package) {
        groupedPrograms[programId].packages.push({
          id_package: row.id_package, // Tambahkan ini
          name_package: row.name_package,
          star: row.star,
          hotel: row.hotel,
          airline_path: row.airline_path || '',
          quad: row.quad ?? 0,
          triple: row.triple ?? 0,
          double: row.double ?? 0,
          include_text: row.include_text || '',
          note: row.note || '',
          program_id_program: row.program_id_program
        });
      }
      
    });

    const finalResult = Object.values(groupedPrograms);
    const filteredResult = finalResult.filter(program => program.packages.length > 0);

    res.json(filteredResult);
  } catch (err) {
    console.error('❌ Error retrieving program and package data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET one package by id with program info
router.get('/detail/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const [rows] = await db.query(`
        SELECT 
          p.id_program,
          p.name_program,
          p.period,
          p.category_program,
          pk.id_package,
          pk.name_package,
          pk.star,
          pk.hotel,
          pk.airline_path,
          pk.quad,
          pk.triple,
          pk.double,
          pk.include_text,
          pk.note,
          pk.program_id_program
        FROM program p
        LEFT JOIN package pk ON p.id_program = pk.program_id_program
        WHERE pk.id_package = ?
        LIMIT 1
      `, [id]);
  
      if (rows.length === 0) return res.status(404).json({ message: 'Not found' });
  
      const row = rows[0];
  
      const packageDetail = {
        id_program: row.id_program,
        name_program: row.name_program,
        period: row.period,
        category_program: row.category_program,
        package: {
          id_package: row.id_package,
          name_package: row.name_package,
          star: row.star,
          hotel: row.hotel,
          airline_path: row.airline_path || '',
          quad: row.quad ?? 0,
          triple: row.triple ?? 0,
          double: row.double ?? 0,
          include_text: row.include_text || '',
          note: row.note || '',
          program_id_program: row.program_id_program
        }
      };
  
      res.json(packageDetail);
    } catch (err) {
      console.error('❌ Error fetching package detail:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  

module.exports = router;

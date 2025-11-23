const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan konfigurasi database sudah benar
const authenticateToken = require("../middleware/authenticateToken");

// 1. Jumlah program kategori UMROH yang aktif
router.get('/count-umroh', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT COUNT(*) AS total FROM program WHERE category_program = 'Umroh'");
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Jumlah program kategori HAJI yang aktif
router.get('/count-haji', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT COUNT(*) AS total FROM program WHERE category_program = 'Haji'");
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Jumlah program kategori WISATA yang aktif
router.get('/count-wisata', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT COUNT(*) AS total FROM program WHERE category_program = 'Wisata'");
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Jumlah file foto yang telah diunggah
router.get('/count-gallery', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT COUNT(*) AS total FROM gallery");
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Jumlah akun yang terdaftar sebagai ADMIN
router.get('/count-admin', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT COUNT(*) AS total FROM accounts WHERE role = 'Admin'");
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Grafik distribusi program berdasarkan kategori
router.get('/programs-distribution', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT category_program, COUNT(*) AS total FROM program GROUP BY category_program");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Grafik jumlah program per periode
router.get('/programs-period', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT period, COUNT(*) AS total FROM program GROUP BY period ORDER BY period ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 8. Grafik jumlah upload foto per program
router.get('/gallery-program', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT program_id_program, COUNT(*) AS total FROM gallery GROUP BY program_id_program");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
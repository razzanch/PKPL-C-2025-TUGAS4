const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();


// Konfigurasi transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


router.post("/", async (req, res) => {
  const { nama, email, subjek, pesan } = req.body;

  // Fungsi validasi XSS & input kosong
  const isValidInput = (value) => {
    const xssPattern = /<script.*?>.*?<\/script>|on\w+=".*?"/gi;
    return value && value.trim() !== "" && !xssPattern.test(value);
  };

  // Validasi semua input
  if (
    !isValidInput(nama) ||
    !isValidInput(email) ||
    !isValidInput(subjek) ||
    !isValidInput(pesan)
  ) {
    return res.status(400).json({
      message: "Input tidak valid. Pastikan semua field diisi dengan benar dan tidak mengandung script berbahaya.",
    });
  }

  const mailOptions = {
    from: `"${nama}" <${email}>`,
    to: "alshawqharomaintravel@gmail.com",
    subject: subjek || "Pesan dari kontak form",
    text: `Pesan dari: ${nama}\nEmail: ${email}\n\n${pesan}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email berhasil dikirim!" });
  } catch (error) {
    console.error("Gagal mengirim email:", error);
    res.status(500).json({ message: "Gagal mengirim email", error });
  }
});

module.exports = router;

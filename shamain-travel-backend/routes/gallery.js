const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const authenticateToken = require("../middleware/authenticateToken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { ensureFolderExists } = require("../utils/fileUtils"); // Import utilitas

// Path folder upload
const UPLOAD_FOLDER = 'public/uploads/gallery/';

// Pastikan folder upload ada saat aplikasi start
ensureFolderExists(UPLOAD_FOLDER);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      ensureFolderExists(UPLOAD_FOLDER);
      cb(null, UPLOAD_FOLDER);
    },
    filename: async (req, file, cb) => {
      try {
        const [programResult] = await db.execute(
          "SELECT name_program FROM program WHERE id_program = ? LIMIT 1",
          [req.body.program_id]
        );
  
        if (programResult.length === 0) {
          throw new Error('Program tidak ditemukan');
        }
  
        const programName = programResult[0].name_program;
        const originalName = path.parse(file.originalname).name;
        const ext = path.extname(file.originalname);
        
        // Better filename sanitization
        const cleanProgramName = programName
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .toLowerCase();
        
        const cleanFileName = originalName
          .replace(/[^\w\s-]/g, '') // Remove special chars
          .replace(/\s+/g, '-')     // Replace spaces with dashes
          .toLowerCase();
        
        // Add timestamp to prevent conflicts
        const timestamp = Date.now();
        const finalFilename = `${cleanProgramName}-${timestamp}-${cleanFileName}${ext}`;
        
        cb(null, finalFilename);
      } catch (error) {
        console.error("Error generating filename:", error);
        cb(error);
      }
    }
  });

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Hanya file gambar (JPEG, JPG, PNG) yang diizinkan!'));
    }
  }
});

router.post("/post", authenticateToken, upload.array('files', 10), async (req, res) => {
  const { program_id } = req.body;
  const files = req.files;
  let transaction;

  try {
      // Validate input
      if (!program_id || !files || files.length === 0) {
          throw new Error('Program ID and files are required');
      }

      // Mulai transaction database
      transaction = await db.getConnection();
      await transaction.beginTransaction();

      // Check if program exists
      const [programResult] = await transaction.execute(
          "SELECT name_program FROM program WHERE id_program = ? LIMIT 1",
          [program_id]
      );
      
      if (programResult.length === 0) {
          throw new Error('Program not found');
      }

      // Check for existing gallery entry with this program_id
      const [existingGallery] = await transaction.execute(
          "SELECT id_gallery FROM gallery WHERE program_id_program = ? LIMIT 1",
          [program_id]
      );

      if (existingGallery.length > 0) {
          // Rollback transaction sebelum melempar error
          await transaction.rollback();
          
          // Hapus file yang sudah terupload
          if (files && files.length > 0) {
              files.forEach(file => {
                  try {
                      fs.unlinkSync(path.join(UPLOAD_FOLDER, file.filename));
                  } catch (err) {
                      console.error("Error deleting file:", file.filename, err);
                  }
              });
          }

          return res.status(400).json({
              code: 400,
              status: "error",
              message: "Program sudah memiliki gallery. Hanya diperbolehkan satu gallery per program.",
              data: {
                  existing_gallery_id: existingGallery[0].id_gallery
              }
          });
      }
      
      const programName = programResult[0].name_program;
      const filePaths = files.map(file => path.join('/uploads/gallery', file.filename));
      const combinedPaths = filePaths.join(', ');
      
      // Insert into database
      const [result] = await transaction.execute(
          "INSERT INTO gallery (image_file, program_id_program) VALUES (?, ?)",
          [combinedPaths, program_id]
      );

      // Commit transaction jika semua berhasil
      await transaction.commit();

      res.status(200).json({
          code: 200,
          status: "success",
          message: `${files.length} files uploaded successfully`,
          data: {
              program_id,
              program_name: programName,
              paths: combinedPaths
          }
      });

  } catch (error) {
      console.error("Upload Error:", {
          message: error.message,
          stack: error.stack,
          body: req.body,
          files: req.files?.map(f => f.originalname)
      });
      
      // Rollback transaction jika ada error
      if (transaction) {
          try {
              await transaction.rollback();
          } catch (rollbackError) {
              console.error("Rollback Error:", rollbackError);
          }
      }
      
      // Hapus file yang sudah terupload jika ada error
      if (files && files.length > 0) {
          files.forEach(file => {
              try {
                  fs.unlinkSync(path.join(UPLOAD_FOLDER, file.filename));
              } catch (err) {
                  console.error("Error deleting file:", file.filename, err);
              }
          });
      }
      
      res.status(500).json({
          code: 500,
          status: "error",
          message: `Upload failed: ${error.message}`,
          data: { error: error.message }
      });
  } finally {
      // Pastikan koneksi ditutup
      if (transaction) {
          try {
              await transaction.release();
          } catch (releaseError) {
              console.error("Connection Release Error:", releaseError);
          }
      }
  }
});

router.get("/get", authenticateToken, async (req, res) => {
  try {
      const query = `
          SELECT 
              g.id_gallery,
              g.image_file,
              p.name_program,
              p.period
          FROM gallery g
          JOIN program p ON g.program_id_program = p.id_program
          ORDER BY g.id_gallery ASC
      `;

      const [galleries] = await db.execute(query);

      // Format the response to include all files in one record
      const formattedGalleries = galleries.map(gallery => {
          return {
              id_gallery: gallery.id_gallery,
              name_program: gallery.name_program,
              period: gallery.period,
              image_file: gallery.image_file // This contains comma-separated paths
          };
      });

      res.status(200).json({
          code: 200,
          status: "success",
          message: "Data gallery berhasil diambil!",
          data: formattedGalleries
      });

  } catch (error) {
      console.error("Error fetching gallery:", {
          message: error.message,
          sql: error.sql,
          stack: error.stack
      });
      
      res.status(500).json({
          code: 500,
          status: "error",
          message: "Terjadi kesalahan saat mengambil data gallery",
          data: { error: error.message }
      });
  }
});

// [DELETE] Hapus Gallery by ID
router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah gallery dengan ID tersebut ada
    const [existingGallery] = await db.execute(
      "SELECT id_gallery, image_file FROM gallery WHERE id_gallery = ?",
      [id]
    );

    if (existingGallery.length === 0) {
      return res.status(404).json({
        code: 404,
        status: "error",
        message: "Gallery tidak ditemukan!",
        data: null,
      });
    }

    const imagePathsString = existingGallery[0].image_file;

    // Split path gambar (bisa satu atau banyak file)
    const allPaths = imagePathsString.split(',').map(p => p.trim());

    let deletedFiles = [];
    let failedToDelete = [];

    for (const p of allPaths) {
      if (!p || p.trim() === '') continue;

      const relativePath = p.replace(/\\/g, '/'); // pastikan slash-nya benar
      const fullPath = path.join(__dirname, '..', 'public', ...relativePath.split('/').slice(1));

      if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
        try {
          fs.unlinkSync(fullPath);
          deletedFiles.push(relativePath);
        } catch (err) {
          console.error("Gagal hapus file:", fullPath, err);
          failedToDelete.push(relativePath);
        }
      } else {
        console.warn("Lewatkan path tidak valid/bukan file:", fullPath);
      }
    }

    // Hapus data gallery dari database
    await db.execute("DELETE FROM gallery WHERE id_gallery = ?", [id]);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: `Gallery berhasil dihapus. ${deletedFiles.length} file terhapus, ${failedToDelete.length} gagal.`,
      data: {
        id_gallery: id,
        deletedFiles,
        failedToDelete,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Terjadi kesalahan server saat menghapus gallery",
      data: null,
    });
  }
});

module.exports = router;
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage }).fields([
  { name: 'undergradMarksheet' },
  { name: 'postgradMarksheet' },
  { name: 'undergradCertificate' },
  { name: 'postgradCertificate' },
  { name: 'aadharCard' },
  { name: 'eligibilityCertificate' },
  { name: 'migrationCertificate' },
  { name: 'passportPhoto' },
  { name: 'bonafideCertificate' },
  { name: 'nocCertificate' },
]);

export const handleUpload = (req, res) => {
  upload(req, res, function (err) {
    if (err) return res.status(400).json({ error: err.message });

    const uploadedFiles = Object.keys(req.files).map(key => ({
      field: key,
      filename: req.files[key][0].filename,
      path: req.files[key][0].path,
    }));

    res.status(200).json({
      message: 'Documents uploaded successfully',
      files: uploadedFiles,
    });
  });
};

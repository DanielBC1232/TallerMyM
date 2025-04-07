import express from 'express';
const router = express.Router();
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads')); // Carpeta donde se guardan las imágenes
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop(); //extraer extension de imagen
        const fileName = `${Date.now()}.${ext}`;
        cb(null, fileName)//con que nombre se guarda la imagen

    }
});

const upload = multer({ storage });

router.post("/upload", upload.single("img"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No se subió ningún archivo" });
    }
    res.json({ message: "Archivo subido correctamente", fileName: req.file.filename });
});

router.get("/:img", (req, res) => {
    const filePath = path.join(__dirname, '../../uploads', req.params.img);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send("Imagen no encontrada");
        }
    });
});

export default router;
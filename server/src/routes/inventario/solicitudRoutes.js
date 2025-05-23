import express from 'express';
import { getAllSolicitud, addSolicitud, updateSolicitud } from "../../controllers/inventario/solicitudController.js";
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get("/solicitud",authMiddleware, getAllSolicitud);
router.post("/agregar-solicitud",authMiddleware, addSolicitud);
router.put("/procesar-solicitud",authMiddleware, updateSolicitud);

export default router;
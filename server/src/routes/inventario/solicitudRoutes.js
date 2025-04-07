import express from 'express';
import { getAllSolicitud, addSolicitud, updateSolicitud } from "../../controllers/inventario/solicitudController.js";

const router = express.Router();

router.get("/solicitud", getAllSolicitud);
router.post("/agregar-solicitud", addSolicitud);
router.put("/procesar-solicitud", updateSolicitud);

export default router;
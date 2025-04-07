import express from 'express';
import * as devolucionController from '../../controllers/finanzas/devolucionController.js';

const router = express.Router();

router.post("/registrar-devolucion/", devolucionController.insertDevolucion);
router.get("/obtener-devolucion/:id", devolucionController.getDevolucionById);

export default router;
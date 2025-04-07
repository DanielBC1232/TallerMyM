import express from 'express';
import * as ordenController from '../../controllers/flujo/ordenController.js';

const router = express.Router();

// Ruta para agregar orden
router.post("/agregar-orden/", ordenController.insertOrden);

// Ruta para obtener lista de ordenes segun su estado
router.get("/obtener-ordenes/:id", ordenController.getOrdenesByStatus);

// Ruta para obtener orden por ID
router.get("/obtener-orden/:id", ordenController.getOrdenById);

// Ruta para actualizar orden - cancelar orden (parametro = 0)
router.put("/actualizar-fase-orden/", ordenController.siguienteFase);

// Ruta para actualizar orden
router.put("/actualizar-orden/", ordenController.updateOrden);

// Exporta el router usando Module ES
export default router;
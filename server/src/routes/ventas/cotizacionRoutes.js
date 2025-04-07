import express from 'express';
import * as cotizacionController from '../../controllers/ventas/cotizacionController.js';

const router = express.Router();

// Ruta para agregar cotización
router.post("/agregar-cotizacion/", cotizacionController.insertCotizacion);
router.get("/obtener-cotizaciones", cotizacionController.getCotizacion);
router.get("/obtener-cotizacion/:id", cotizacionController.getCotizacionById);
router.put("/actualizar-cotizacion/", cotizacionController.updateCotizacion);
router.delete("/eliminar-cotizacion/:id", cotizacionController.deleteCotizacion);

// Exporta el router usando Module ES
export default router;
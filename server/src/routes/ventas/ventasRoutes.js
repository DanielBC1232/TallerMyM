import express from 'express';
import * as ventasController from '../../controllers/ventas/ventasController.js';

const router = express.Router();

router.post("/registrar-venta/", ventasController.insertVenta);
router.post("/obtener-ventas", ventasController.getVentas);
router.get("/obtener-venta/:id", ventasController.getVentaById);
router.post("/agregar-producto/", ventasController.agregarProducto);
router.get("/obtener-productos-venta/:id", ventasController.getProductosVenta);
router.post("/eliminar-producto-venta/", ventasController.deleteProductoVenta);
router.get("/existe-pago/:id", ventasController.existePago);

// Exporta el router usando Module ES
export default router;
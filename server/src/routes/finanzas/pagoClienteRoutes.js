import express from 'express';
import * as pagoClienteController from '../../controllers/finanzas/pagoClienteController.js';

const router = express.Router();

router.post("/registrar-pago/", pagoClienteController.insertPagoCliente);
router.get("/obtener-pago/:id", pagoClienteController.getPagoClienteById);

export default router;
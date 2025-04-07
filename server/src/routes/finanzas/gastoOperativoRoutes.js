import express from 'express';
import * as gastoOperativoController from '../../controllers/finanzas/gastoOperativoController.js';

const router = express.Router();

router.post("/agregar-gasto-operativo/", gastoOperativoController.insertGastoOperativo);
router.get("/obtener-gastos-operativos/", gastoOperativoController.getGastoOperativos);

export default router;
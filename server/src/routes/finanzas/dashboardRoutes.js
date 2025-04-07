import express from 'express';
import * as dashboardController from '../../controllers/finanzas/dashboardController.js';

const router = express.Router();

router.get("/obtener-ganancia-mes", dashboardController.getGananciaMes);
router.get("/obtener-gasto-mes", dashboardController.getGastoMes);

router.get("/obtener-ganancias-mes", dashboardController.getGananciasMes);
router.get("/obtener-gastos-mes", dashboardController.getGastosMes);

router.get("/obtener-top-ventas", dashboardController.getTopVentas);

export default router;

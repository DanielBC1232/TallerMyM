const express = require("express");
const dashboardController = require('../../controllers/finanzas/dashboardController');
const router = express.Router();

router.get("/obtener-ganancia-mes/", dashboardController.getGanaciaMes);
router.get("/obtener-gasto-mes/", dashboardController.getGastoMes);

router.get("/obtener-ganancias-mes/", dashboardController.getGanaciasMes);
router.get("/obtener-gastos-mes/", dashboardController.getGastosMes);

router.get("/obtener-top-ventas/", dashboardController.getTopVentas);

module.exports = router;

const express = require("express");
const cotizacionController = require('../../controllers/ventas/cotizacionController');
const router = express.Router();

// Ruta para agregar cotización
router.post("/agregar-cotizacion/", cotizacionController.insertCotizacion);

// Exporta el router usando CommonJS
module.exports = router;

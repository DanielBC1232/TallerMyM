const express = require("express");
const ordenController = require('../../controllers/flujo/ordenController');
const router = express.Router();

// Ruta para agregar orden
router.post("/agregar-orden/", ordenController.insertOrden);

// Ruta para obtener todos los ordenes
router.get("/obtener-ordenes", ordenController.getOrdenes);

// Ruta para obtener orden por ID
router.get("/obtener-orden/:id", ordenController.getOrdenById);

// Ruta para actualizar orden
router.put("/actualizar-orden/", ordenController.updateOrden);

// Ruta para eliminar orden por ID
router.put("/eliminar-orden/:id", ordenController.deleteOrden);

// Exporta el router usando CommonJS
module.exports = router;

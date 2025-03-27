const express = require("express");
const trabajadorController = require('../../controllers/trabajadores/trabajadoresController');
const SolicitudController = require('../../controllers/trabajadores/SolicitudController');
const router = express.Router();

// Ruta para agregar trabajador
router.post("/agregar-trabajador/", trabajadorController.insertTrabajador);

// Ruta para obtener todos los trabajadores
router.get("/obtener-trabajadores", trabajadorController.getTrabajadores);

router.get("/obteneTrabajadoresMenu/", trabajadorController.obtenerTrabajadoresMenuDesplegable);


// Ruta para obtener trabajador por ID
router.get("/obtener-trabajador/:id", trabajadorController.getTrabajadorById);

// Ruta para actualizar trabajador
router.put("/actualizar-trabajador/", trabajadorController.updateTrabajador);

// Ruta para eliminar trabajador por ID
router.delete("/eliminar-trabajador/:id", trabajadorController.deleteTrabajador);

// Ruta para agregar trabajador
router.post("/Solicitud-Vacaciones/", SolicitudController.insertSolicitudVacaciones);

// Exporta el router usando CommonJS
module.exports = router;

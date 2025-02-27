const express = require('express');
const router = express.Router();
const { obtenerTrabajadores } = require('../../controllers/trabajadores/obtenerController');

// Ruta para obtener todos los trabajadores
router.get('/', obtenerTrabajadores);

module.exports = router;

const express = require('express');
const { getTrabajadores, addTrabajador } = require('../controllers/trabajador.controller');
const router = express.Router();

router.get('/trabajadores', getTrabajadores); // Obtener todos los trabajadores
router.post('/trabajadores', addTrabajador);  // Agregar un trabajador

module.exports = router;

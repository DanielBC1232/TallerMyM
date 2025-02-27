const express = require('express');
const router = express.Router();
const { actualizarSalario } = require('../../controllers/trabajadores/gestionarSalarioController');

// Ruta para actualizar el salario de un trabajador
router.put('/:id/salario', actualizarSalario);

module.exports = router;

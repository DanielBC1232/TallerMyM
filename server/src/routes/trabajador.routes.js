
// routes/trabajador.routes.js
const express = require('express');
const router = express.Router();
const { getTrabajadores } = require('../controllers/trabajador.controller'); // Asumiendo que tienes un controller

// Ruta para obtener trabajadores
router.get('/trabajadores', trabajadorController.getTrabajadores);

module.exports = router;

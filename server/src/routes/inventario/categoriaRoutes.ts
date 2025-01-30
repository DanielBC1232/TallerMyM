import express from 'express';
import getCategorias from '../../controllers/inventario/categoriaController';
  
const router = express.Router();

// Rutas para manejar las categorías
router.get('/', getCategorias);  // Obtener todas las categorías

export default router;


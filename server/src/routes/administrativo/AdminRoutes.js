import express from "express";
import * as adminController from "../../controllers/administrativo/adminController.js";
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/iniciar-sesion', adminController.iniciarSesion);//EL unico que no usa token, porque es el que lo genera

// Rutas protegidas
router.post("/registrar-usuario", authMiddleware, adminController.registrarUsuario);
router.get('/obtenerUsuarios', authMiddleware, adminController.obtenerUsuarios);
router.put('/editar/:idUsuario', authMiddleware, adminController.actualizarUsuario);
router.get('/obtenerUsuario/:id', authMiddleware, adminController.obtenerUsuario);
router.put('/cambiar-estado-usuario', authMiddleware, adminController.cambiarEstadoUsuario);

export default router;
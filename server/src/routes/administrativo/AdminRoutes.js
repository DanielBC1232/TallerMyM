import express from "express";
import adminController from "../../controllers/administrativo/adminController.js";

const router = express.Router();
//Recordar Hashear Contraseña !!!!

router.post("/registrar", adminController.registrarUsuario);
router.put('/editar/:idUsuario', adminController.actualizarUsuario);
router.delete('/eliminar/:idUsuario', adminController.eliminarUsuario);

router.get('/obtenerUsuarios', adminController.obtenerTodosLosUsuarios);
router.get('/obtenerUsuario/:idUsuario', adminController.obtenerunUsuario);
router.get('/obtenerUsuarioEdit/:idUsuario', adminController.obtenerunUsuarioEdit);

export default router;

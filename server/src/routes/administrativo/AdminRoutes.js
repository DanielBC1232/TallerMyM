import express from "express";
import * as adminController from "../../controllers/administrativo/adminController.js";

const router = express.Router();

router.post("/registrar-usuario", adminController.registrarUsuario);
router.get('/obtenerUsuarios', adminController.obtenerUsuarios);

router.post('/iniciar-sesion', adminController.iniciarSesion);

router.put('/editar/:idUsuario', adminController.actualizarUsuario);
router.get('/obtenerUsuario/:id', adminController.obtenerUsuario);
router.put('/cambiar-estado-usuario/', adminController.cambiarEstadoUsuario);



export default router;
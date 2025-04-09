import express from "express";
import * as adminController from "../../controllers/administrativo/adminController.js";

const router = express.Router();

router.post("/registrar-usuario", adminController.registrarUsuario);
router.get('/obtenerUsuarios', adminController.obtenerUsuarios);

router.put('/editar/:idUsuario', adminController.actualizarUsuario);
router.get('/obtenerUsuario/:id', adminController.obtenerUsuario);
router.delete('/desactivar-usuario/:idUsuario', adminController.eliminarUsuario);

export default router;
import express from 'express';
import * as notificacionesController from '../../controllers/notificaciones/notificacionesController.js';

const router = express.Router();

router.post("/obtener-notificaciones/", notificacionesController.getNotificaciones);
router.delete("/eliminar-notificacion/:id", notificacionesController.EliminarNotificacion);

export default router;
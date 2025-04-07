import express from 'express';
import * as trabajadorController from '../../controllers/trabajadores/trabajadoresController.js';
import * as SolicitudController from '../../controllers/trabajadores/SolicitudController.js';

const router = express.Router();

// Ruta para agregar trabajador
router.post("/agregar-trabajador/", trabajadorController.insertTrabajador);

// Ruta para obtener todos los trabajadores
router.get("/obtener-trabajadores", trabajadorController.getTrabajadores);

// Ruta para obtener trabajador por ID
router.get("/obtener-trabajador/:id", trabajadorController.getTrabajadorById);

// Ruta para actualizar trabajador
router.put("/actualizar-trabajador/", trabajadorController.updateTrabajador);

// Ruta para eliminar trabajador por ID
router.delete("/eliminar-trabajador/:id", trabajadorController.deleteTrabajador);

//Rutas relacionadas con Solicitud de vacaciones

// Rutas Crud
router.post("/Solicitud-Vacaciones", SolicitudController.InsertSolicitudVacaciones);
router.put("/Edit-Vacaciones/:idVacaciones", SolicitudController.UpdateSolicitudVacaciones);
router.delete("/Elim-Vacaciones/:idVacaciones", SolicitudController.DeleteSolicitudVacaciones);

//aprobar y rechazar
router.put("/Aprob-Vacaciones/:idVacaciones", SolicitudController.AprobarSolicitudVacaciones);
router.put("/Rechazar-Vacaciones/:idVacaciones", SolicitudController.RechazarSolicitudVacaciones);

//Rutas Get
router.get("/obteneTrabajadoresMenu", trabajadorController.obtenerTrabajadoresMenuDesplegable);
router.get("/obtenerSolicitudVacaciones", SolicitudController.ObtenerVacacionesGest);
router.get("/obtenerSolicitudVacacion/:idVacaciones", SolicitudController.ObtenerVacacionxID);

// Exporta el router usando Module ES
export default router;
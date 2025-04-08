import express from 'express';
import * as trabajadorController from '../../controllers/trabajadores/trabajadoresController.js';
import * as SolicitudController from '../../controllers/trabajadores/SolicitudController.js';
import * as AmonestacionController from '../../controllers/trabajadores/AmonestacionesController.js';
import * as AusenciaController from '../../controllers/trabajadores/AusenciasController.js';
import * as JustificacionController from '../../controllers/trabajadores/JustificacionesController.js';


const router = express.Router();
//TRABAJADORES
// Rutas CRUD Trabajadores
router.post("/agregar-trabajador/", trabajadorController.insertTrabajador);
router.put("/actualizar-trabajador/", trabajadorController.updateTrabajador);
router.delete("/eliminar-trabajador/:id", trabajadorController.deleteTrabajador);
//Rutas Obtener
router.get("/obtener-trabajadores", trabajadorController.getTrabajadores);
router.get("/obtener-trabajador/:id", trabajadorController.getTrabajadorById);


//TRABAJAORES-VACACIONES
// Rutas CRUD Vacaciones
router.post("/Solicitud-Vacaciones", SolicitudController.InsertSolicitudVacaciones);
router.put("/Edit-Vacaciones/:idVacaciones", SolicitudController.UpdateSolicitudVacaciones);
router.delete("/Elim-Vacaciones/:idVacaciones", SolicitudController.DeleteSolicitudVacaciones);
//Rutas Get
router.get("/obteneTrabajadoresMenu", trabajadorController.obtenerTrabajadoresMenuDesplegable);
router.get("/obtenerSolicitudVacaciones", SolicitudController.ObtenerVacacionesGest);
router.get("/obtenerSolicitudVacacion/:idVacaciones", SolicitudController.ObtenerVacacionxID);
//aprobar y rechazar
router.put("/Aprob-Vacaciones/:idVacaciones", SolicitudController.AprobarSolicitudVacaciones);
router.put("/Rechazar-Vacaciones/:idVacaciones", SolicitudController.RechazarSolicitudVacaciones);


// AMONESATACIONES--
// Operaciones CRUD
router.post("/Insert-Amonestacion", AmonestacionController.InsertAmonestacion);
router.put("/Edit-Amonestacion/:idAmonestacion", AmonestacionController.UpdateAmonestacion);
router.delete("/Elim-Amonestacion/:idAmonestacion", AmonestacionController.DeleteAmonestacion);
// Rutas Get
router.get("/obtenerAmonestaciones", AmonestacionController.ObtenerAmonestaciones);
router.get("/obtenerAmonestacion/:idAmonestacion", AmonestacionController.ObtenerAmonestacionxID);


// AUSENCIAS--
// Operaciones CRUD
router.post("/insert-ausencia", AusenciaController.insertAusencia);
router.put("/update-ausencia/:idAusencia", AusenciaController.updateAusencia);
router.delete("/delete-ausencia/:idAusencia", AusenciaController.deleteAusencia);
// Rutas Get
router.get("/obtener-ausencias", AusenciaController.obtenerAusencias);
router.get("/obtener-ausencia/:idAusencia", AusenciaController.obtenerAusenciaPorId);
router.get("/obtener-ausencias-trabajador/:idTrabajador", AusenciaController.obtenerAusenciasPorTrabajador);


// JUSTIFICACIONES
// Operaciones CRUD
router.post("/insert-justificacion", JustificacionController.insertJustificacion);
router.put("/update-justificacion/:idJustificacion", JustificacionController.updateJustificacion);
router.delete("/delete-justificacion/:idJustificacion", JustificacionController.deleteJustificacion);
// Rutas Get
router.get("/obtener-justificaciones", JustificacionController.obtenerJustificaciones);
router.get("/obtener-justificacion/:idJustificacion", JustificacionController.obtenerJustificacionPorId);
router.get("/obtener-justificacion-ausencia/:idAusencia", JustificacionController.obtenerJustificacionPorAusencia);


//REPORTES--
//Reporte de trabajadores mas eficientes
router.get("/trabajadores-eficientes", trabajadorController.getTrabajadoresEficientes);

// Exporta el router usando Module ES
export default router;
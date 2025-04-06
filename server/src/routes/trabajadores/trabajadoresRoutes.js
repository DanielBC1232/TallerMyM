const express = require("express");
const trabajadorController = require('../../controllers/trabajadores/trabajadoresController');
const SolicitudController = require('../../controllers/trabajadores/SolicitudController');
const AmonestacionController = require('../../controllers/trabajadores/AmonestacionesController');
const AusenciaController = require('../../controllers/trabajadores/AusenciasController');
const JustificacionController = require('../../controllers/trabajadores/JustificacionesController');
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

// --Rutas Amonestaciones --
// Operaciones CRUD
router.post("/Insert-Amonestacion", AmonestacionController.InsertAmonestacion);
router.put("/Edit-Amonestacion/:idAmonestacion", AmonestacionController.UpdateAmonestacion);
router.delete("/Elim-Amonestacion/:idAmonestacion", AmonestacionController.DeleteAmonestacion);

// Rutas Get
router.get("/obtenerAmonestaciones", AmonestacionController.ObtenerAmonestaciones);
router.get("/obtenerAmonestacion/:idAmonestacion", AmonestacionController.ObtenerAmonestacionxID);

// --Rutas Ausencias --
// Operaciones CRUD
router.post("/insert-ausencia", AusenciaController.insertAusencia);
router.put("/update-ausencia/:idAusencia", AusenciaController.updateAusencia);
router.delete("/delete-ausencia/:idAusencia", AusenciaController.deleteAusencia);

// Rutas Get
router.get("/obtener-ausencias", AusenciaController.obtenerAusencias);
router.get("/obtener-ausencia/:idAusencia", AusenciaController.obtenerAusenciaPorId);
router.get("/obtener-ausencias-trabajador/:idTrabajador", AusenciaController.obtenerAusenciasPorTrabajador);

// --Rutas Justificaciones --
// Operaciones CRUD
router.post("/insert-justificacion", JustificacionController.insertJustificacion);
router.put("/update-justificacion/:idJustificacion", JustificacionController.updateJustificacion);
router.delete("/delete-justificacion/:idJustificacion", JustificacionController.deleteJustificacion);

// Rutas Get
router.get("/obtener-justificaciones", JustificacionController.obtenerJustificaciones);
router.get("/obtener-justificacion/:idJustificacion", JustificacionController.obtenerJustificacionPorId);
router.get("/obtener-justificacion-ausencia/:idAusencia", JustificacionController.obtenerJustificacionPorAusencia);

// Exporta el router usando CommonJS
module.exports = router;

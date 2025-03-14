import express from "express";
import vehiculoController from "../../controllers/vehiculos/vehiculoController.js";//

const router = express.Router();

// Ruta para registrar un vehiculo
router.post("/registrar", vehiculoController.insertarVehiculo);
router.put("/editar/:idVehiculo", vehiculoController.actualizarVehiculo);
router.delete("/eliminar/:idVehiculo", vehiculoController.eliminarVehiculo);

router.get("/ObtenerVehiculos", vehiculoController.obtenerTodosLosVehiculos);
router.get("/ObtenerVehiculo/:placaVehiculo", vehiculoController.obtenerVehiculoPorPlaca);



export default router;
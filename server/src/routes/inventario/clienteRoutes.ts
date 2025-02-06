import express from "express";
import { insertCliente, getHistorialOrdenesByCedula, actualizarCliente, eliminarCliente, agregarVehiculos, eliminarVehiculo, obtenerClientePorCedula, obtenerVehiculos } from "../../controllers/inventario/clienteController"; 

const router = express.Router();

router.post("/registrar", insertCliente);
router.get("/:cedula", obtenerClientePorCedula);
router.get("/ordenes/:cedula", getHistorialOrdenesByCedula);
router.put('/:idCliente', actualizarCliente);
router.delete('/:cedula', eliminarCliente);
router.get("/:cedula/vehiculos", obtenerVehiculos)
router.post('/:cedula/vehiculos', agregarVehiculos);
router.delete('/:cedula/vehiculos/:idVehiculo', eliminarVehiculo);

export default router;

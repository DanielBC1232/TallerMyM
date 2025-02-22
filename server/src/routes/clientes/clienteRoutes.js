import express from "express";
import { 
  insertCliente, 
  getHistorialOrdenesByCedula, 
  actualizarCliente, 
  eliminarCliente, 
  agregarVehiculos, 
  eliminarVehiculo, 
  obtenerClientePorCedula, 
  obtenerVehiculos 
} from "../../controllers/inventario/clienteController"; 

const router = express.Router();

// Ruta para registrar un cliente
router.post("/registrar", insertCliente);

// Ruta para obtener un cliente por su cédula
router.get("/:cedula", obtenerClientePorCedula);

// Ruta para obtener el historial de órdenes de un cliente
router.get("/ordenes/:cedula", getHistorialOrdenesByCedula);

// Ruta para actualizar los datos de un cliente
router.put('/:idCliente', actualizarCliente);

// Ruta para eliminar un cliente por cédula
router.delete('/:cedula', eliminarCliente);

// Ruta para obtener los vehículos de un cliente
router.get("/:cedula/vehiculos", obtenerVehiculos);

// Ruta para agregar vehículos a un cliente
router.post('/:cedula/Agreg_vehiculos', agregarVehiculos);

// Ruta para eliminar un vehículo de un cliente
router.delete('/:cedula/vehiculos/:idVehiculo', eliminarVehiculo);

export default router;

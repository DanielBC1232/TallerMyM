import express from "express";
import clienteController from "../../controllers/clientes/clienteController.js";

const router = express.Router();

// Ruta para registrar un cliente
router.post("/registrar", clienteController.insertCliente);
// Ruta para actualizar los datos de un cliente
router.put('/editar/:idCliente', clienteController.actualizarCliente);
// Ruta para eliminar un cliente por cédula
router.delete('/:cedula', clienteController.eliminarCliente);

router.get("/obtenerclientes", clienteController.obtenerTodosLosClientes);


// Ruta para obtener un cliente por su cédula
router.get("/:cedula", clienteController.obtenerClientePorCedula);

// Ruta para obtener el historial de órdenes de un cliente
router.get("/ordenes/:cedula", clienteController.getHistorialOrdenesByCedula);



export default router;

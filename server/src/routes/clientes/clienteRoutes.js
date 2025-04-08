import express from "express";
import * as clienteController from "../../controllers/clientes/clienteController.js";

const router = express.Router();

// Ruta para registrar un cliente
router.post("/registrar", clienteController.insertCliente);
// Ruta para actualizar los datos de un cliente
router.put('/editar/:cedula', clienteController.actualizarCliente);
// Ruta para eliminar un cliente por cédula
router.delete('/eliminar/:cedula', clienteController.eliminarCliente);

//Obtener
router.get("/obtener-clientes", clienteController.obtenerTodosLosClientes);

router.get("/obtener-clientes-inactivos", clienteController.getClientesInactivos);

router.get("/:cedula", clienteController.obtenerClientePorCedula);


export default router;
const { Cliente, ClienteRepository } = require("../../models/clientes/cliente.js");

const clienteRepo = new ClienteRepository();

// Insertar un cliente
const insertCliente = async (req, res) => {
  try {
    const { nombre, apellido, cedula, correo, telefono, fechaRegistro } = req.body;
    const newCliente = new Cliente(nombre, apellido, cedula, correo, telefono, fechaRegistro);

    await clienteRepo.insert(newCliente);
    res.status(201).json(newCliente);
  } catch (error) {
    console.error("Error al insertar cliente:", error);
    res.status(500).json({ error: "Error al insertar el cliente" });
  }
};

// Obtener Historial de Órdenes de Cliente
const getHistorialOrdenesByCedula = async (req, res) => {
  try {
    const cedula = req.params.cedula;
    const historialOrdenes = await clienteRepo.getHistorialOrdenesByCedula(cedula);

    if (!historialOrdenes || historialOrdenes.length === 0) {
      res.status(404).json({ error: "No se encontraron órdenes para este cliente" });
      return;
    }
    res.json(historialOrdenes);
  } catch (error) {
    console.error("Error en getHistorialOrdenesByCedula:", error);
    res.status(500).json({ error: "Error al obtener el historial de órdenes" });
  }
};

// Actualizar cliente
const actualizarCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.idCliente);
    const datosActualizados = req.body;
    const actualizacionExitosa = await clienteRepo.updateCliente(id, datosActualizados);

    if (!actualizacionExitosa) {
      res.status(404).json({ error: "Cliente no encontrado o no se pudo actualizar" });
    } else {
      res.status(200).json({ message: "Datos del cliente actualizados exitosamente" });
    }
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error al actualizar los datos del cliente" });
  }
};

// Eliminar cliente
const eliminarCliente = async (req, res) => {
  try {
    const cedula = req.params.cedula;
    const clienteEliminado = await clienteRepo.deleteCliente(cedula);

    if (!clienteEliminado) {
      res.status(404).json({ error: "Cliente no encontrado o no se pudo eliminar" });
    } else {
      res.status(200).json({ message: "Cliente eliminado exitosamente" });
    }
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};

// Obtener cliente por cédula
const obtenerClientePorCedula = async (req, res) => {
  try {
    const cedula = req.params.cedula;
    const cliente = await clienteRepo.getByCedula(cedula);

    if (!cliente) {
      res.status(404).json({ error: "Cliente no encontrado" });
    } else {
      res.status(200).json(cliente);
    }
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({ error: "Error al obtener cliente" });
  }
};

module.exports = { 
  insertCliente, 
  obtenerClientePorCedula, 
  getHistorialOrdenesByCedula, 
  actualizarCliente, 
  eliminarCliente 
};

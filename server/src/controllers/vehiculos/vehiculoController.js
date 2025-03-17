const { Vehiculo, VehiculoRepository } = require("../../models/vehiculos/vehiculo");

const VehiculoRepo = new VehiculoRepository();

// Insertar un vehiculo
const insertarVehiculo = async (req, res) => {
  try {
    const { placaVehiculo, modeloVehiculo, marcaVehiculo, annoVehiculo, tipoVehiculo, idCliente } = req.body;//parametros
    const newVehiculo = new Vehiculo(placaVehiculo, modeloVehiculo, marcaVehiculo, annoVehiculo, tipoVehiculo, idCliente);

    await VehiculoRepo.insert(newVehiculo);
    res.status(201).json(newVehiculo);
  } catch (error) {
    console.error("Error al insertar cliente:", error);
    res.status(500).json({ error: "Error al insertar el cliente" });
  }
};
//-----------------------------------------------
// Actualizar cliente

const actualizarVehiculo = async (req, res) => {
  try {
    
    const idVehiculo = parseInt(req.params.idVehiculo);
    const datosActualizados = req.body;
    const actualizacionExitosa = await VehiculoRepo.updateVehiculo(idVehiculo, datosActualizados);

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
const eliminarVehiculo = async (req, res) => {
  try {
    const idVehiculo = parseInt(req.params.idVehiculo);
    const vehiculoEliminado = await VehiculoRepo.deleteVehiculo(idVehiculo);

    if (!vehiculoEliminado) {
      res.status(404).json({ error: "Vehiculo no encontrado oooo no se pudo eliminar" });
    } else {
      res.status(200).json({ message: "Vehiculo eliminado exitosamente" });
    }
  } catch (error) {
    console.error("Error al eliminar Vehiculo:", error);
    res.status(500).json({ error: "Error al eliminar Vehiculo" });
  }
};

// Obtener todos los vehiculos
const obtenerTodosLosVehiculos = async (req, res) => {
  try {
    // Usar el método getAll del repositorio
    const vehiculos = await VehiculoRepo.getAll();

    res.status(200).json(vehiculos);
  } catch (error) {
    console.error("Error al obtener todos los clientes:", error);
    res.status(500).json({ error: "Error al obtener todos los clientes" });
  }
};

// Obtener todos vehiculos
const getVehiculosPorCliente = async (req, res) => {
  try {
    // Usar el método getVehiculosPorCliente del repositorio
    const idCliente = parseInt(req.params.idCliente);

    const vehiculos = await VehiculoRepo.getVehiculosPorCliente(idCliente);

    res.status(200).json(vehiculos);
  } catch (error) {
    console.error("Error al obtener los vehiculos del cliente:", error);
    res.status(500).json({ error: "Error al obtener los vehiculos del cliente" });
  }
};
 
// Obtener un cliente por cédula
const obtenerVehiculoPorPlaca = async (req, res) => {
  try {
    const { placa } = req.params; // Obtener la cédula del query string

    if (!placa) {
      return res.status(400).json({ error: "La placa es requerida" });
    }

    const vehiculo = await VehiculoRepo.getByPlaca(placa);

    if (!vehiculo || vehiculo.length === 0) {
      res.status(404).json({ error: "vehiculo no encontrado" });
    } else {
      res.status(200).json(vehiculo[0]); // Devuelve el primer vehiculo encontrado
    }
  } catch (error) {
    console.error("Error al obtener vehiculo por placa:", error);
    res.status(500).json({ error: "Error al obtener vehiculo por cédula" });
  }
};



module.exports = { 
  insertarVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
  obtenerTodosLosVehiculos,
  obtenerVehiculoPorPlaca,
  getVehiculosPorCliente
};











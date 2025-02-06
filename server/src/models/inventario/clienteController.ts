import { Request, Response } from "express";
import { Cliente, ClienteRepository } from "../../models/inventario/cliente";
import { VehiculosRepository } from "../../models/inventario/vehiculo";

const clienteRepo = new ClienteRepository();
const vehiculoRepo = new VehiculosRepository();

// Insertar un cliente
export const insertCliente = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      apellido,
      cedula,
      correo,
      telefono,
      fechaRegistro,
    }: Cliente = req.body;
    const newCliente = new Cliente(
      nombre,
      apellido,
      cedula,
      correo,
      telefono,
      fechaRegistro
    );

    await clienteRepo.insert(newCliente);

    res.status(201).json(newCliente);
  } catch (error) {
    console.error("Error al insertar cliente:", error);
    res.status(500).json({ error: "Error al insertar el cliente" });
  }
};

// Obtener Historial de Ordenes de Cliente
export const getHistorialOrdenesByCedula = async (
  req: Request,
  res: Response
) => {
  try {
    const cedula = req.params.cedula;
    const historialOrdenes = await clienteRepo.getHistorialOrdenesByCedula(
      cedula
    );

    if (!historialOrdenes || historialOrdenes.length === 0) {
      res
        .status(404)
        .json({ error: "No se encontraron órdenes para este cliente" });
      return;
    } else {
      res.json(historialOrdenes);
    }
  } catch (error) {
    console.error("Error en getHistorialOrdenesByCedula:", error);
    res.status(500).json({ error: "Error al obtener el historial de órdenes" });
  }
};

//Actualizar cliente
export const actualizarCliente = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.idCliente);
    const datosActualizados = req.body;
    const actualizacionExitosa = await clienteRepo.updateCliente(
      id,
      datosActualizados
    );

    if (!actualizacionExitosa) {
      res.status(404).json({
        error: "Cliente no encontrado o no se pudo actualizar",
      });
    } else {
      res.status(200).json({
        message: "Datos del cliente actualizados exitosamente",
      });
    }
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({
      error: "Error al actualizar los datos del cliente",
    });
  }
};

//Eliminar cliente
export const eliminarCliente = async (req: Request, res: Response) => {
  try {
    const cedula = req.params.cedula;
    console.log(cedula);
    const clienteEliminado = await clienteRepo.deleteCliente(cedula);

    if (!clienteEliminado) {
      res
        .status(404)
        .json({ error: "Cliente no encontrado o no se pudo eliminar" });
    } else {
      res.status(200).json({ message: "Cliente eliminado exitosamente" });
    }
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};

//Obtener cliente por cedula
export const obtenerClientePorCedula = async (req: Request, res: Response) => {
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

//Obtener vehiculos por cedula del cliente
export const obtenerVehiculos = async (req: Request, res: Response) => {
  try {
    const cedula = req.params.cedula;
    const cliente = await clienteRepo.getByCedula(cedula);

    if (!cliente) {
      res.status(404).json({ error: "Cliente no encontrado" });
    } else {
      const vehiculos = await vehiculoRepo.getVehiculosByCliente(
        cliente.idCliente
      );

      if (vehiculos.length === 0) {
        res
          .status(404)
          .json({ message: "No se encontraron vehículos para este cliente" });
      } else {
        console.log(vehiculos);
        res.status(200).json(vehiculos);
      }
    }
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    res.status(500).json({ error: "Error al obtener vehículos" });
  }
};

//Agregar un nuevo vehiculo a cliente
export const agregarVehiculos = async (req: Request, res: Response) => {
  try {
    const vehiculos = req.body.vehiculos;
    const cliente = await clienteRepo.getByCedula(req.params.cedula);

    if (!cliente) {
      res.status(404).json({ error: "Cliente no encontrado" });
    } else {
      await vehiculoRepo.agregarVehiculos(cliente.idCliente, vehiculos);
      res.status(200).json({ message: "Vehículos agregados exitosamente" });
    }
  } catch (error) {
    console.error("Error al agregar vehículos:", error);
    res.status(500).json({ error: "Error al agregar vehículos" });
  }
};

export const eliminarVehiculo = async (req: Request, res: Response) => {
  try {
    const idVehiculo = parseInt(req.params.idVehiculo);
    const cliente = await clienteRepo.getByCedula(req.params.cedula);
    const vehiculo = await vehiculoRepo.getVehiculoById(
      idVehiculo,
      cliente.idCliente
    );

    if (!vehiculo) {
      res
        .status(404)
        .json({ error: "Vehículo no encontrado o no pertenece al cliente" });
    }

    await vehiculoRepo.eliminarVehiculo(idVehiculo);

    res.status(200).json({ message: "Vehículo eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    res.status(500).json({ error: "Error al eliminar vehículo" });
  }
};

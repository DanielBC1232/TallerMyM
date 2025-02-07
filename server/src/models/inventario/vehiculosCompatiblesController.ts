import { Request, Response } from "express";
import { VehiculoRepository } from "../../models/inventario/vehiculosCompatibles";

const vehiculosRepo = new VehiculoRepository();

// Obtener todas las Vehiculos
export const getAllVehiculos = async (_req: Request, res: Response) => {
  try {
    const vehiculo = await vehiculosRepo.getAll(); // Get

    //validaciones
    res.json(vehiculo);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las vehiculos" });
  }
};

// Obtener una vehiculo por ID
export const getVehiculoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const vehiculo = await vehiculosRepo.findById(id); // Get

    // Validaciones - return
    if (!vehiculo){
      res.status(404).json({ error: "Vehiculo no encontrada" }); // Return
    }
    res.json(vehiculo); //Return exitoso

  } catch (error) {
    console.error("Error en getVehiculoById:", error);
    res.status(500).json({ error: "Error al obtener la vehiculo" });
  }
};

import { Request, Response } from "express";
import { ProveedorRepository } from "../../models/inventario/proveedor";

const proveedorRepo = new ProveedorRepository();

// Obtener todas los proverdores
export const getAllProveedor = async (_req: Request, res: Response) => {
  try {
    const proveedor = await proveedorRepo.getAll(); // Get

    //validaciones
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los proveedores" });
  }
};

// Obtener un proveedor por ID
export const getProveedorById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const proveedor = await proveedorRepo.findById(id); // Get

    // Validaciones - return
    if (!proveedor){
      res.status(404).json({ error: "Proveedor no encontrado" }); // Return
    }
    res.json(proveedor); //Return exitoso

  } catch (error) {
    console.error("Error en getProveedorById:", error);
    res.status(500).json({ error: "Error al obtener la proveedor" });
  }
};

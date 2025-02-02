import { Request, Response } from "express";
import { ProveedorRepository } from "../../models/inventario/proveedor";

const proveedorRepo = new ProveedorRepository();

// Obtener todas las categorías
export const getAllProveedor = async (_req: Request, res: Response) => {
  try {
    const proveedor = await proveedorRepo.getAll(); // Get

    //validaciones
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

// Obtener una categoría por ID
export const getProveedorById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.idProveedor);
    //if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const proveedor = await proveedorRepo.findById(id); // Get

    // Validaciones - return
    if (!proveedor){
      res.status(404).json({ error: "Categoría no encontrada" }); // Return
    }
    res.json(proveedor); //Return exitoso

  } catch (error) {
    console.error("Error en getProveedorById:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

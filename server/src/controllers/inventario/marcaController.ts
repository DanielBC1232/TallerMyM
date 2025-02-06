import { Request, Response } from "express";
import { MarcaRepository } from "../../models/inventario/marca";

const categoriaRepo = new MarcaRepository();

// Obtener todas las marcas
export const getAllMarcas = async (_req: Request, res: Response) => {
  try {
    const marca = await categoriaRepo.getAll(); // Get

    //validaciones
    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las marcas" });
  }
};

// Obtener una marca por ID
export const getMarcaById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const marca = await categoriaRepo.findById(id); // Get

    // Validaciones - return
    if (!marca){
      res.status(404).json({ error: "marca no encontrada" }); // Return
    }
    res.json(marca); //Return exitoso

  } catch (error) {
    console.error("Error en getMarcaById:", error);
    res.status(500).json({ error: "Error al obtener la marca" });
  }
};

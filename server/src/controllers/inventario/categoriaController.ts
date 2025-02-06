import { Request, Response } from "express";
import { CategoriaRepository } from "../../models/inventario/categoria";

const categoriaRepo = new CategoriaRepository();

// Obtener todas las categorías
export const getAllCategorias = async (_req: Request, res: Response) => {
  try {
    const categorias = await categoriaRepo.getAll(); // Get

    //validaciones
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

// Obtener una categoría por ID
export const getCategoriaById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const categoria = await categoriaRepo.findById(id); // Get

    // Validaciones - return
    if (!categoria){
      res.status(404).json({ error: "Categoría no encontrada" }); // Return
    }
    res.json(categoria); //Return exitoso

  } catch (error) {
    console.error("Error en getCategoriaById:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

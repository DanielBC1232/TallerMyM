import { Request, Response } from 'express';
import Categoria from '../../models/inventario/categoria';

// Controlador para obtener todas las categorías
export const getCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);  // Retorna las categorías en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

export default getCategorias;

import express from "express";
import { getAllCategorias, getCategoriaById } from "../../controllers/inventario/categoriaController";

const router = express.Router();

router.get("/", getAllCategorias); // GET /api/categorias
router.get("/:id", getCategoriaById); // GET /api/categorias/:id

export default router;

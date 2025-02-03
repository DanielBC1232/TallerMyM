import express from "express";
import { getAllCategorias, getCategoriaById } from "../../controllers/inventario/categoriaController";

const router = express.Router();

router.get("/", getAllCategorias); // GET /categorias
router.get("/:id", getCategoriaById); // GET /categorias/:id

export default router;

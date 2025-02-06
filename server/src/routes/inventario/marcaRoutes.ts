import express from "express";
import { getAllMarcas, getMarcaById } from "../../controllers/inventario/marcaController";

const router = express.Router();

router.get("/", getAllMarcas); // GET /marca
router.get("/:id", getMarcaById); // GET /marca/:id

export default router;

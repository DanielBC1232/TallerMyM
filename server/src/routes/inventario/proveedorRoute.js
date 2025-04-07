import express from 'express';
import { getAllProveedor, getProveedorById } from "../../controllers/inventario/proveedorController.js";

const router = express.Router();

router.get("/", getAllProveedor); // GET /api/categorias
router.get("/:id", getProveedorById); // GET /api/categorias/:id

export default router;
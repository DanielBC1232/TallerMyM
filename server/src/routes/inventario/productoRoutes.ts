import express from "express";
import { getAllProductos, getProductoById} from "../../controllers/inventario/productoController";

const router = express.Router();

router.get("/", getAllProductos); // GET /marca
router.get("/:id", getProductoById); // GET /marca/:id

export default router;

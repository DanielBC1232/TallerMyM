import express from "express";
import {
  getAllProductos,
  getProductoById,
  addProducto,
  updateProducto,
  deleteProducto,
} from "../../controllers/inventario/productoController";

const router = express.Router();

router.get("/", getAllProductos); 
router.get("/:id", getProductoById);
router.post("/agregar-producto/", addProducto);
router.patch("/actualizar-producto/:id", updateProducto);
router.delete("/eliminar-producto/:id", deleteProducto);

export default router;

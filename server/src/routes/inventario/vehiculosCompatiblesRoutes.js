import express from 'express';
import { getAllVehiculos, getVehiculoById } from "../../controllers/inventario/vehiculosCompatiblesController.js";

const router = express.Router();

router.get("/", getAllVehiculos);
router.get("/:id", getVehiculoById);

export default router;
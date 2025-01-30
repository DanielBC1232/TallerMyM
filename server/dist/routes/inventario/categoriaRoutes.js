"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoriaController_1 = __importDefault(require("../../controllers/inventario/categoriaController"));
const router = express_1.default.Router();
// Rutas para manejar las categorías
router.get('/', categoriaController_1.default); // Obtener todas las categorías
exports.default = router;

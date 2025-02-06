"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const marcaController_1 = require("../../controllers/inventario/marcaController");
const router = express_1.default.Router();
router.get("/", marcaController_1.getAllMarcas); // GET /marca
router.get("/:id", marcaController_1.getMarcaById); // GET /marca/:id
exports.default = router;

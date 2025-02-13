"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const imgRoutes_1 = __importDefault(require("../routes/inventario/imgRoutes"));
const categoriaRoutes_1 = __importDefault(require("../routes/inventario/categoriaRoutes"));
const marcaRoutes_1 = __importDefault(require("../routes/inventario/marcaRoutes"));
const proveedorRoute_1 = __importDefault(require("../routes/inventario/proveedorRoute"));
const vehiculosCompatiblesRoutes_1 = __importDefault(require("../routes/inventario/vehiculosCompatiblesRoutes"));
const productoRoutes_1 = __importDefault(require("../routes/inventario/productoRoutes"));
const database_1 = require("../config/database");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware
const PORT = 3000; // Iniciar servidor
app.listen(3000, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
(0, database_1.connectDB)() // conexion BD
    .then(() => console.log("Conectado a la base de datos"))
    .catch((err) => {
    if (err instanceof Error) {
        console.error("Error en la conexión:", err.message);
    }
    else {
        console.error("Error en la conexión:", err);
    }
});
//* Rutas Inventario
app.use("/categorias", categoriaRoutes_1.default);
app.use("/marcas", marcaRoutes_1.default);
app.use("/proveedor", proveedorRoute_1.default);
app.use("/vehiculos-compatibles", vehiculosCompatiblesRoutes_1.default);
app.use("/productos", productoRoutes_1.default);
app.use("/img", imgRoutes_1.default);
//* Rutas Perfil
//app.use("/usuario", usuarioRoutes);

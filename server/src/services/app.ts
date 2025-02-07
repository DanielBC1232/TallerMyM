import express from "express";
import cors from "cors";
import categoriaRoutes from "../routes/inventario/categoriaRoutes";
import marcaRoutes from "../routes/inventario/marcaRoutes";
import proveedorRoutes from "../routes/inventario/proveedorRoute";
import vehiculosCompatiblesRoute from "../routes/inventario/vehiculosCompatiblesRoutes";
import productoRoutes from "../routes/inventario/productoRoutes";
import clienteRoutes from "../routes/inventario/clienteRoutes";


import { connectDB } from "../config/database";
const app = express();

app.use(express.json()); // Middleware

const PORT = 3000; // Iniciar servidor
app.listen(3000, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

connectDB() // conexion BD
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => {
    if (err instanceof Error) {
      console.error("Error en la conexión:", err.message);
    } else {
      console.error("Error en la conexión:", err);
    }
  });

//* Rutas Inventario
app.use("/categorias", categoriaRoutes);
app.use("/marcas", marcaRoutes);
app.use("/proveedor", proveedorRoutes);
app.use("/vehiculos-compatibles", vehiculosCompatiblesRoute);
app.use("/productos", productoRoutes);
app.use("/clientes", clienteRoutes);

//* Rutas Perfil
//app.use("/usuario", usuarioRoutes);

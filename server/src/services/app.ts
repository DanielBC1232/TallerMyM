import express from 'express';
import categoriaRoutes from '../routes/inventario/categoriaRoutes'
import { connectDB } from '../config/database';
const app = express();

// Middleware
app.use(express.json());

// Iniciar servidor
const PORT = 3000
app.listen(3000, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

//prueba conexion
connectDB()
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => {
    if (err instanceof Error) {
      console.error("Error en la conexión:", err.message);
    } else {
      console.error("Error en la conexión:", err);
    }
  });

app.use("/api/categorias", categoriaRoutes);



import express from 'express';
const app = express();

//import { connect } from 'tedious';

//Database connection
const { connect } = require("../config/database");

// Middleware
app.use(express.json());

const PORT = 3000
// Iniciar servidor
app.listen(3000, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

//prueba conexion
connect()
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => {
    if (err instanceof Error) {
      console.error("Error en la conexión:", err.message);
    } else {
      console.error("Error en la conexión:", err);
    }
  });


app.get('/ping', (_req, res) => {
  console.log("Ping");
  res.send("respuesta ping Awa");
})

//app.use('/api/categorias', categoriaRoutes);



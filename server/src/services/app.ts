import express from 'express';
//import categoriaRoutes from './routes/inventario/categoriaRoutes';

const app = express();

// Middleware
app.use(express.json());

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log("Ping");
  res.send("respuesta ping Awa");
})

//app.use('/api/categorias', categoriaRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
